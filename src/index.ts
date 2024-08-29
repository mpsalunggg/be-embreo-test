import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route'
import errorHandler from './middlewares/error.middleware'
import mongooseConfig from './utils/db.util'
const PORT = process.env.PORT || 3000

dotenv.config()

const app = express()

app.use(express.json())
app.use('/api/auth', authRoutes)

app.use(errorHandler)

mongooseConfig()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
