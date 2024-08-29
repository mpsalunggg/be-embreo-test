import { Request, Response, NextFunction } from 'express'
import { registerUser, loginUser } from '../services/auth.service'
import { ApiResponse } from '../utils/response.util'

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, role, company } = req.body
    const user = await registerUser(username, password, role, company)
    res.status(201).json(ApiResponse('User registered successfully', user))
  } catch (error) {
    next(error)
  }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body
    const { user, token } = await loginUser(username, password)
    res.status(200).json(ApiResponse('Login success', { user, token }))
  } catch (error) {
    next(error)
  }
}
