import mongoose from 'mongoose'
import { ENV } from './env.js'

export const connectDB = async (params) => {
  try {
    if (!ENV.DB_URL) {
      console.log(ENV.DB_URL)
      throw new Error("DB_URL is not defined in environment variables");
    }
    const conn = await mongoose.connect(ENV.DB_URL,{
      family: 4, 
  });
    console.log('Connection established with : ',conn.connection.host)
  } catch (error) {
    console.error('Error in connecting with DB : ', error)
    // process.exit(1)
    throw error
  }
}