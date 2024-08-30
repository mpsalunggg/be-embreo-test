import mongoose, { Schema, Document, Types } from 'mongoose'

export interface ScheduleModel extends Document {
  id_event: Types.ObjectId | string
  id_vendor: Types.ObjectId | string
  id_author: Types.ObjectId | string
  location: string
  street_address: string
  postal_code: number | null
  proposed_dates: Date[]
  confirm_date: Date | null
  status: 'Approve' | 'Pending' | 'Reject'
  remarks_reject: string | null
  created_at: Date
}

const ScheduleSchema = new Schema<ScheduleModel>({
  id_event: {
    type: Schema.Types.ObjectId,
    ref: 'Events',
    required: true,
  },
  id_vendor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  id_author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  street_address: {
    type: String,
    required: true,
  },
  postal_code: {
    type: Number,
    default: null,
  },
  proposed_dates: {
    type: [Date],
    required: true,
    validate: {
      validator: (dates: Date[]) => {
        return dates.length >= 3
      },
      message: 'Proposed dates must have at least 3 dates',
    },
  },
  confirm_date: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: ['Approve', 'Pending', 'Reject'],
    default: 'Pending',
  },
  remarks_reject: {
    type: String,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model<ScheduleModel>('Schedule', ScheduleSchema)
