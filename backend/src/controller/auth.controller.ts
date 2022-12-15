import { Request, Response } from "express";
import * as authService from './../service/auth.service'

export async function signUp(req: Request, res: Response){
  try {
    await authService.signUp(req.body, res) 
  } catch (error) {
    res.status(404)
    res.send({message: error.cause})
  }
}

export async function signIn(req: Request, res: Response) {
  try {
    await authService.signIn(req.body, res)
  } catch (error) {
    res.status(404)
    res.send({message: error.cause})
  }
}