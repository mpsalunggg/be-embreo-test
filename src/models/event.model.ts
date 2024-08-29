import mongoose, { Schema, Document, Types } from 'mongoose'

export interface EventModel extends Document {
  event_name: string
  id_author: Types.ObjectId | string
}

const EventSchema: Schema = new Schema({
  event_name: { type: String, unique: true, required: true },
  id_author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

export default mongoose.model<EventModel>('Event', EventSchema)
