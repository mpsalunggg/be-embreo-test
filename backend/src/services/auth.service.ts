import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createUser, getUserByUsername } from '../repositories/user.repository'
import { ApiError } from '../utils/error.util'
import { UserModel } from '../models/user.model'
import { UserData } from '../utils/type.util'

export const registerUser = async (
  username: string,
  password: string,
  role: string,
  company: string
): Promise<UserModel> => {
  const existingUser = await getUserByUsername(username)
  if (existingUser) {
    throw new ApiError('Username already exists!', 409)
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  return createUser({ username, password: hashedPassword, role, company })
}

export const loginUser = async (
  username: string,
  password: string
): Promise<{ token: string; user: UserData }> => {
  const user = await getUserByUsername(username)

  if (!user) {
    throw new ApiError('Invalid username or password', 401)
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw new ApiError('Invalid username or password', 401)
  }

  const { _id, username: user_name, role, company } = user

  const token = jwt.sign(
    {
      id: _id,
      username: user_name,
      role: role,
      company: company,
    },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  )

  return {
    token,
    user: {
      id: _id as string,
      username: user_name,
      role: role,
      company: company,
    },
  }
}
