import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { ApiError } from '../utils/error.util'
import { UserData } from '../utils/type.util'

export interface CustomRequest extends Request {
  jwt?: UserData | JwtPayload
}

export const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header('Authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError('Token is not valid or expired!', 401)
  }

  const token = authHeader.split(' ')[1]

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET!)
  req.jwt = decodedToken as UserData
  next()
}
