import express from 'express'
import path from 'path'
import { ENV } from './lib/env.js'
import { connectDB } from './lib/db.js'

const app = express()

const __dirname = path.resolve()


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
    app.listen(ENV.PORT, ()=> console.log(`I am alive : ${ENV.PORT}!!!`))
  } catch (error) {
    console.error('Error in starting the server: ',error)
  }
}
startServer()