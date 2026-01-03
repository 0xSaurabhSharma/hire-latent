import express from 'express'
import path from 'path'
import cors from 'cors'
import {serve} from 'inngest'

import { ENV } from './lib/env.js'
import { connectDB } from './lib/db.js'
import { functions, inngest } from './lib/inngest.js'


const port = ENV.PORT || 3000
const app = express()
const __dirname = path.resolve()


app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials:true
}))
app.use('/app/ingest',serve({client:inngest, functions: functions}))
app.use(express.json())


app.get('/test', (req,res)=>{
  res.status(201).json({msg:'I am test'})
})

app.get('/health', (req, res) => {
  console.log(`I am alive : ${ENV.PORT}!!!`)
  res.status(200).json({ msg: `I am alive : ${ENV.PORT}!!!` })
})


// make app ready for prod
if (ENV.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')))

  app.get('/{*any}', (req,res)=> {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
  })
}


const startServer = async () => {
  try {
    await connectDB()
    app.listen(port, ()=> console.log(`I am alive : ${port}!!!`))
  } catch (error) {
    console.error('Error in starting the server: ', error)
    process.exit(1)
  }
}
startServer()