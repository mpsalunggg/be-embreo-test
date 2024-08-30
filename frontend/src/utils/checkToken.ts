import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
  exp: number
  [key: string]: any
}

export const checkToken = (token: string | null): boolean => {
  if (!token) return false

  try {
    const decoded = jwtDecode<JwtPayload>(token)
    const now = Math.floor(Date.now() / 1000)
    return decoded.exp > now
  } catch (error) {
    return false
  }
}
