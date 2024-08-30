'use client'
import { Button } from 'antd'
import useAuth from '@/hooks/useAuth'
import Link from 'next/link'

const Dashboard = () => {
  const { isTokenValid, user } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center mt-24 text-center">
      {!isTokenValid ? (
        <div className="space-y-2">
          <div>
            <h1 className="text-3xl font-semibold">
              👋 Welcome to{' '}
              <span>
                WellnessEvent
                <span className="font-bold text-blue-500">Book</span>
              </span>
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Discover and book the best wellness events to rejuvenate your mind
            and body.
          </p>
          <Button type="primary">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">
            👋 Welcome Back!{' '}
            <span className="font-bold text-blue-500">{user?.username}</span>
          </h1>
          <p className="text-lg text-gray-600">
            Explore your booked events and upcoming wellness activities.
          </p>
          <Button type="primary">
            <Link href="/event">See Event</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

export default Dashboard
