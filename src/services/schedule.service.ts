import { ScheduleModel } from '../models/schedule.model'
import {
  changeStatus,
  createSchedule,
  getAllSchedule,
  getDetailSchedule,
} from '../repositories/schedule.repository'
import { ScheduleDetail } from '../utils/type.util'

export const createScheduleService = async (
  scheduleData: Partial<ScheduleModel>
): Promise<ScheduleModel> => {
  const newSchedule = await createSchedule(scheduleData)
  return newSchedule
}

export const getDetailScheduleService = async (
  id: string
): Promise<ScheduleDetail[] | null> => {
  const detailSchedule = await getDetailSchedule(id)
  return detailSchedule
}

export const changeStatusService = async (
  id_schedule: number,
  { status, confirm_date, remarks_reject }: Partial<ScheduleModel>
): Promise<ScheduleModel | null> => {
  if (status === 'Approve') {
    remarks_reject = null
  } else if (status === 'Reject') {
    confirm_date = null
  }

  const newSchedule = await changeStatus(id_schedule, {
    status,
    confirm_date,
    remarks_reject,
  })
  return newSchedule
}

export const getAllScheduleService = async (
  id: string,
  role: string
): Promise<ScheduleDetail[] | null> => {
  return getAllSchedule(id, role)
}
