import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../helper/validateHelper";

export const userDTO: any[] = [
  check('username')
  .exists()
  .notEmpty()
  .isString(),

  check('email')
  .exists()
  .notEmpty()
  .isEmail(),

  check('password')
  .exists()
  .notEmpty()
  .isString(),

  check('name')
  .optional()
  .isString(),

  (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password, name} = req.body
    req.body = { username, email, password, name }
    validateResult(req, res, next)
  }
]