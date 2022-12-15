import { NextFunction, Request, Response } from 'express'

export const middlewareRoles = (role: "USER" | "ADMIN") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { rol } = req.user
    if(rol !== role){
      return res.send({message: "Acceso denegado"})
    }
    next()
  }
}