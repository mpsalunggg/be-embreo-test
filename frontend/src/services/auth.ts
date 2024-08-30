import { LoginResType, LoginReqType } from '@/domains/auth'
import { fetcher } from './instance'
import { setToken, setUser } from '@/utils/storage'
import { BaseResponse } from '@/domains/response'

export const AuthService = {
  login: async (data: LoginReqType): Promise<BaseResponse<LoginResType>> => {
    const res = await fetcher.post('/auth/login', data)
    setToken(res.data.data.token)
    setUser(res.data.data.user)
    return res.data
  },
}
