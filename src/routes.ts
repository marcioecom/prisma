import { Router } from "express";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "./useCases/createUser/CreateUserController";
import { RefreshTokenUserController } from "./useCases/refreshTokenUser/RefreshTokenUserController";

const router = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const refreshTokenUserController = new RefreshTokenUserController()

router.post('/users', createUserController.handle)
router.post('/login', authenticateUserController.handle)
router.post('/refresh-token', refreshTokenUserController.handle)

router.get('/courses', ensureAuthenticated, (req, res) => {
  return res.json([
    { id: 1, name: "nodejs" },
    { id: 2, name: "reactjs" },
    { id: 3, name: "react native" },
    { id: 4, name: "flutter" },
    { id: 5, name: "elixir" },
  ])
})

export { router }
