import { EventModel } from '../models/event.model'
import { ScheduleModel } from '../models/schedule.model'
import { UserModel } from '../models/user.model'
import { Document } from 'mongoose'

export interface ScheduleDetail
  extends Omit<ScheduleModel, 'id_event' | 'id_vendor' | 'id_author'> {
  eventDetails: EventModel | null
  vendorDetails: UserModel | null
  authorDetails: UserModel | null
}

export interface VendorInfo extends Document {
  company: string
}

export interface UserData {
  id: string
  username: string
  role: string
  company: string
}
