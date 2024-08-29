import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoutes from './routes/auth.route'
import eventRoutes from './routes/event.route'
import scheduleRoutes from './routes/schedule.route'
import userRoutes from './routes/user.route'

import errorHandler from './middlewares/error.middleware'
import mongooseConfig from './utils/db.util'
const PORT = process.env.PORT || 3000

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (_: Request, res: Response) => {
  res.json({ message: 'You are connected!' })
})

app.use('/api/auth', authRoutes)
app.use('/api/event', eventRoutes)
app.use('/api/schedule', scheduleRoutes)
app.use('/api/user', userRoutes)

app.use(errorHandler)

mongooseConfig()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
