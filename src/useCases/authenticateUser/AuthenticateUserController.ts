import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body

    const authenticateUserUseCase = new AuthenticateUserUseCase()

    const token = await authenticateUserUseCase.execute({
      username,
      password
    })

    return res.json(token)
  }
}

export { AuthenticateUserController }
