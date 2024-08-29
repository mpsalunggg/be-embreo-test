import User, { UserModel } from '../models/user.model'

export const createUser = async (
  user: Partial<UserModel>
): Promise<UserModel> => {
  return User.create(user)
}

export const findUserByUsername = async (
  username: string
): Promise<UserModel | null> => {
  return User.findOne({ username })
}

export const findUserById = async (id: string): Promise<UserModel | null> => {
  return User.findById(id)
}
