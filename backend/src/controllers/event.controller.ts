import { Request, Response, NextFunction } from 'express'
import {
  createEventService,
  getAllEventService,
} from '../services/event.service'
import { ApiResponse } from '../utils/response.util'

export const createEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { event_name, id_author } = req.body
    const event = await createEventService(event_name, id_author)
    res.status(201).json(ApiResponse('Success create event', event))
  } catch (error) {
    next(error)
  }
}

export const getAllEventsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const event = await getAllEventService()
    res.status(201).json(ApiResponse('Success get all events', event))
  } catch (error) {
    next(error)
  }
}
