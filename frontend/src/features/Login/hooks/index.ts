import { LoginReqType } from '@/domains/auth'
import { AuthService } from '@/services/auth'
import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

export const useAuthLogin = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: async (values: LoginReqType) => await AuthService.login(values),
    onSuccess: () => {
      router.push('/')
      message.success('Login success!')
    },
    onError: (err: AxiosError) => {
      message.error(err?.message || 'Something went wrong!')
    },
  })
}
