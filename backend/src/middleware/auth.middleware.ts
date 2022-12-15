import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { User } from '../types/user'

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]
  jwt.verify(token, process.env.JWT_SECRET, (err, user: User)=> {
    if(err) return res.sendStatus(403)
    req.user = user
    next()
  })
}