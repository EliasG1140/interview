
import express from 'express'
import * as authController from '../../controller/auth.controller'
import { authenticateToken } from '../../middleware/auth.middleware'
import { userDTO, userLoginDTO } from '../../validators'
export const authRouter = express.Router()

authRouter
  .post('/register', userDTO, authController.signUp)
  .post('/login', userLoginDTO, authenticateToken, authController.signIn)