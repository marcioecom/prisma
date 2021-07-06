import { client } from "../../prisma/client"
import { compare } from 'bcryptjs'
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"

interface IRequest {
  username: string;
  password: string;
}

class AuthenticateUserUseCase {
  async execute({ username, password }: IRequest) {
    // Verificar se o usuario existe

    const userAlredyExists = await client.user.findFirst({
      where: {
        username
      }
    })

    if (!userAlredyExists) {
      throw new Error('User or password incorrect')
    }

    // Verificar se a senha está correta

    const passwordMatch = await compare(password, userAlredyExists.password)

    if (!passwordMatch) {
      throw new Error('User or password incorrect')
    }

    // Gerar token do usuario
    const generateTokenProvider = new GenerateTokenProvider()
    const token = await generateTokenProvider.execute(userAlredyExists.id)

    await client.refreshToken.deleteMany({
      where: {
        userId: userAlredyExists.id
      }
    })

    const generateRefreshToken = new GenerateRefreshToken()
    const refreshToken = await generateRefreshToken.execute(userAlredyExists.id)

    return { token, refreshToken }
  }
}

export { AuthenticateUserUseCase }
