import { NextFunction, Request, Response } from "express";
import { check, oneOf } from "express-validator";
import { validateResult } from "../helper/validateHelper";

export const userLoginDTO: any[] = [
  oneOf([
    check('username')
    .exists()
    .notEmpty()
    .isString(),
  
    check('password')
    .exists()
    .notEmpty()
    .isString()
  ]),
  (req: Request, res: Response, next: NextFunction) => {

    const {username, password} = req.body
    req.body = { username, password}
    validateResult(req, res, next)
  }
]