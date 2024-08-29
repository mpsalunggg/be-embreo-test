import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/error.util'
import mongoose from 'mongoose'

const errorHandler = (
  err: ApiError | mongoose.Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.code).json({
      message: err.message,
      code: err.code,
    })
  }

  if (err instanceof mongoose.Error) {
    return res.status(500).json({
      message: err.message,
      code: 500,
      data: err,
    })
  }

  return res.status(500).json({
    message: 'Internal Server Error',
    code: 500,
  })
}

export default errorHandler
