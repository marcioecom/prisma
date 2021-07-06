import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { username, name, password } = req.body

    const authenticateUserUseCase = new CreateUserUseCase()

    const user = await authenticateUserUseCase.execute({
      username,
      name,
      password
    })

    return res.json(user)
  }
}

export { CreateUserController }
