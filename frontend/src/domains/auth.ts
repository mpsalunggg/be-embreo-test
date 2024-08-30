export interface UserType {
  id: string
  username: string
  role: string
  company: string
}

export interface LoginResType {
  user: UserType
  token: string
}

export interface LoginReqType {
  username: string
  password: string
}
