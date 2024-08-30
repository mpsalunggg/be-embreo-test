'use client'
import { Form, Input, Button, Card } from 'antd'
import { useAuthLogin } from './hooks'
import { FC } from 'react'

const Login: FC = () => {
  const { mutate, isPending } = useAuthLogin()
  const onFinish = (values: any) => {
    mutate(values)
  }

  return (
    <div className="flex justify-center flex-col gap-4 items-center h-screen px-4">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">
          WellnessEvent<span className="font-bold text-blue-500">Book</span>
        </h1>
        <p className="text-slate-500">Silahkan login terlebih dahulu</p>
      </div>
      <Card className="lg:w-1/4 md:w-1/3 w-full">
        <Form
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              disabled={isPending}
            >
              {isPending ? 'Loading...' : 'Login'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
