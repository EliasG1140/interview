import { validationResult } from 'express-validator'
import { NextFunction, Request, Response } from 'express'

export const validateResult = (req: Request, res: Response, next: NextFunction) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (error) {
    res.status(404)
    res.send({ error: error.array()})
  }
}