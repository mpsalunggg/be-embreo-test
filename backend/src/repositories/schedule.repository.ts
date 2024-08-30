import { Types } from 'mongoose'
import Schedule, { ScheduleModel } from '../models/schedule.model'
import { ScheduleDetail } from '../utils/type.util'

const pipeline = [
  {
    $lookup: {
      from: 'events',
      localField: 'id_event',
      foreignField: '_id',
      as: 'eventDetails',
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: 'id_vendor',
      foreignField: '_id',
      as: 'vendorDetails',
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: 'id_author',
      foreignField: '_id',
      as: 'authorDetails',
    },
  },
  {
    $project: {
      location: 1,
      street_address: 1,
      postal_code: 1,
      proposed_dates: 1,
      confirm_date: 1,
      status: 1,
      remarks_reject: 1,
      created_at: 1,
      eventDetails: { $arrayElemAt: ['$eventDetails', 0] },
      vendorDetails: { $arrayElemAt: ['$vendorDetails', 0] },
      authorDetails: { $arrayElemAt: ['$authorDetails', 0] },
    },
  },
]

export const createSchedule = async (
  schedule: Partial<ScheduleModel>
): Promise<ScheduleModel> => {
  return Schedule.create(schedule)
}

export const getDetailSchedule = async (
  id: string
): Promise<ScheduleDetail[] | null> => {
  return Schedule.aggregate([
    { $match: { _id: new Types.ObjectId(id) } },
    ...pipeline,
  ])
}

export const changeStatus = async (
  id_schedule: number,
  { status, confirm_date, remarks_reject }: Partial<ScheduleModel>
): Promise<ScheduleModel | null> => {
  const updateSchedule = await Schedule.findByIdAndUpdate(
    id_schedule,
    { status, confirm_date, remarks_reject },
    { new: true }
  )
  return updateSchedule
}

export const getAllSchedule = async (
  id_user: string,
  role: string
): Promise<ScheduleDetail[] | null> => {
  const userId = new Types.ObjectId(id_user)
  return Schedule.aggregate([
    {
      $match: {
        ...(role === 'Vendor' ? { id_vendor: userId } : { id_author: userId }),
      },
    },
    ...pipeline,
  ])
}
