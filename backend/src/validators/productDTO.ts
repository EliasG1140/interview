import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../helper/validateHelper";

export const productDTO: any[] = [
  check('name')
  .exists()
  .notEmpty()
  .isString(),

  check('price')
  .exists()
  .notEmpty()
  .isNumeric(),

  check('descripcion')
  .optional()
  .isString(),

  (req: Request, res: Response, next: NextFunction) => {
    const { name, price, descripcion} = req.body
    req.body = { name, price, descripcion }
    validateResult(req, res, next)
  }
]