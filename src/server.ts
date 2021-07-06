import 'express-async-errors'
import express, { Request, Response, NextFunction } from 'express'
import { router } from './routes'

const app = express()

app.use(express.json())

app.use(router)

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  return res.json({
    status: "Error",
    message: error.message
  })
})

app.listen(3000, () => console.log('Server running on 3000'))
