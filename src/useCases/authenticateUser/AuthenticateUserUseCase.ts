import { client } from "../../prisma/client"
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken"

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
    const token = sign({}, process.env.SECRET, {
      subject: userAlredyExists.id,
      expiresIn: '1d'
    })

    return { token }
  }
}

export { AuthenticateUserUseCase }
