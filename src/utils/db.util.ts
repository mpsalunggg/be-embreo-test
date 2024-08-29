import mongoose from 'mongoose'

const mongooseConfig = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION!)
    console.log('Database Connected')
  } catch (err) {
    console.log('Error Connecting', err)
  }
}

export default mongooseConfig
