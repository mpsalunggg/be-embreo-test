import { Request, Response, NextFunction } from 'express'
import { ApiResponse } from '../utils/response.util'
import { getAllVendorService } from '../services/user.service'

export const getAllVendorController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vendor = await getAllVendorService()
    res.status(201).json(ApiResponse('Success get all vendor', vendor))
  } catch (error) {
    next(error)
  }
}
