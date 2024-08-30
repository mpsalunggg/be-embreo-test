import User, { UserModel } from '../models/user.model'
import { VendorInfo } from '../utils/type.util'

export const createUser = async (
  user: Partial<UserModel>
): Promise<UserModel> => {
  return User.create(user)
}

export const getUserByUsername = async (
  username: string
): Promise<UserModel | null> => {
  return User.findOne({ username })
}

export const getUserById = async (id: string): Promise<UserModel | null> => {
  return User.findById(id)
}

export const getAllVendor = async (): Promise<VendorInfo[]> => {
  const vendor = User.find({ role: 'Vendor' }, { _id: 1, company: 1 }).exec()
  return vendor
}
