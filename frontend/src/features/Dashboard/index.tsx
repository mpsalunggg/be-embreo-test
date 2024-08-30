'use client'
import { Button } from 'antd'
import { useState } from 'react'

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <div className="flex flex-col items-center justify-center mt-24 text-center">
      {!isLoggedIn ? (
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
          <Button type="primary">Login</Button>
        </div>
      ) : (
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">
            👋 Welcome <span className="font-bold text-blue-500">Back!</span>
          </h1>
          <p className="text-lg text-gray-600">
            Explore your booked events and upcoming wellness activities.
          </p>
          <Button type="primary">See Event</Button>
        </div>
      )}
    </div>
  )
}

export default Dashboard
