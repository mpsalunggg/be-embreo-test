import { Request, Response, NextFunction } from 'express'
import {
  changeStatusService,
  createScheduleService,
  getAllScheduleService,
  getDetailScheduleService,
} from '../services/schedule.service'
import { ApiResponse } from '../utils/response.util'
import { CustomRequest } from '../middlewares/auth.middleware'

export const createScheduleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schedule = await createScheduleService(req.body)
    res.status(201).json(ApiResponse('Success create schedule!', schedule))
  } catch (error) {
    next(error)
  }
}

export const getDetailScheduleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id_schedule } = req.params
    const schedule = await getDetailScheduleService(id_schedule)
    res.status(201).json(ApiResponse('Success get detail schedule!', schedule))
  } catch (error) {
    next(error)
  }
}

export const changeStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id_schedule, status, confirm_date, remarks_reject } = req.body
    const schedule = await changeStatusService(id_schedule, {
      status,
      confirm_date,
      remarks_reject,
    })
    res.status(201).json(ApiResponse('Success change status!', schedule))
  } catch (error) {
    next(error)
  }
}

export const getAllScheduleController = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const schedule = await getAllScheduleService(req.jwt?.id, req.jwt?.role)
    res.status(201).json(ApiResponse('Success get all data schedule!', schedule))
  } catch (error) {
    next(error)
  }
}
