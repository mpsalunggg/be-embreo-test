import { Button } from 'antd'
import Link from 'next/link'
import { FC } from 'react'

const Navbar: FC = () => {
  const isLogin = true
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto p-5">
        <div className="flex items-center justify-between gap-4">
          <Link href="/">
            <h1 className="text-xl font-semibold">
              WellnessEvent<span className="font-bold text-blue-500">Book</span>
            </h1>
          </Link>

          <nav className="flex items-center gap-7">
            <div className="flex gap-2 items-center">
              {isLogin ? (
                <div className="flex items-center gap-2">
                  <p>
                    Hi, <span className="text-blue-500">Anonymous</span>
                  </p>
                  <Button type="primary">Logout</Button>
                </div>
              ) : (
                <Button>Login</Button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
export default Navbar
