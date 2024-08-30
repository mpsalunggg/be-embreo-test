'use client'
import { FC, useEffect, useState } from 'react'
import { Button, message } from 'antd'
import Link from 'next/link'
import { checkToken } from '@/utils/checkToken'
import { getToken, getUser, removeLocalStorage } from '@/utils/storage'
import { useRouter } from 'next/navigation'
import { UserType } from '@/domains/auth'
import useAuth from '@/hooks/useAuth'

const Navbar: FC = () => {
  const { isTokenValid, user } = useAuth()
  const router = useRouter()

  const logout = () => {
    removeLocalStorage()
    message.success('Logout Success!')
    router.push('/login')
  }

  return (
    <div className="border-b">
      <div className="max-w-7xl mx-auto p-5">
        <div className="flex items-center justify-between gap-4">
          <Link href="/">
            <h1 className="text-xl font-semibold">
              WellnessEvent<span className="font-bold text-blue-500">Book</span>
            </h1>
          </Link>

          <div className="flex items-center gap-7">
            <div className="flex gap-2 items-center">
              {isTokenValid ? (
                <div className="flex items-center gap-2">
                  <p>
                    Hi, <span className="text-blue-500">{user?.username}</span>
                  </p>
                  <Button type="primary" onClick={logout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Button type="primary">
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </div>  
          </div>
        </div>
      </div>
    </div>
  )
}
export default Navbar
