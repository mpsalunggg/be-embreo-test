'use client'

import { useState, useEffect } from 'react'
import { getToken, getUser } from '@/utils/storage'
import { checkToken } from '@/utils/checkToken'
import { UserType } from '@/domains/auth'

const useAuth = () => {
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null)
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    const token = getToken()
    const user = getUser()

    if (token) {
      setIsTokenValid(checkToken(token))
      setUser(user as UserType)
    } else {
      setIsTokenValid(false)
    }
  }, [])

  return { isTokenValid, user }
}

export default useAuth
