import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createUser, findUserByUsername } from '../repositories/user.repository'
import { ApiError } from '../utils/error.util'
import { UserModel } from '../models/user.model'

export const registerUser = async (
  username: string,
  password: string,
  role: string,
  company: string
): Promise<UserModel> => {
  if (!username || !password) {
    throw new ApiError('Username and password are required!', 400)
  }

  if (!company) {
    throw new ApiError('Company required!', 400)
  }

  if (!role) {
    throw new ApiError('Role required!', 400)
  }

  const existingUser = await findUserByUsername(username)
  if (existingUser) {
    throw new ApiError('Username already exists!', 409)
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  return createUser({ username, password: hashedPassword, role, company })
}

export const loginUser = async (
  username: string,
  password: string
): Promise<string> => {
  if (!username || !password) {
    throw new ApiError('Username and password are required', 400)
  }

  const user = await findUserByUsername(username)

  if (!user) {
    throw new ApiError('Invalid username or password', 401)
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw new ApiError('Invalid username or password', 401)
  }

  const token = jwt.sign(
    { id: user._id, role: user.role, company: user.company },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  )

  return token
}
