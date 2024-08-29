import mongoose, { Schema, Document } from 'mongoose'

export interface UserModel extends Document {
  username: string
  password: string
  role: string
  company: string
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['HR', 'Vendor'] },
  company: { type: String, required: true },
})

export default mongoose.model<UserModel>('User', UserSchema)
