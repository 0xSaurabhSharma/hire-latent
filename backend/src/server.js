import express from 'express'
import { ENV } from './lib/env.js'


const app = express()


app.get('/health', (req, res) => {
  console.log(`I am alive : ${ENV.PORT}!!!`)
  res.status(200).json({ msg: `I am alive : ${ENV.PORT}!!!` })
})

app.listen(ENV.PORT, () => {
  console.log(`I am alive : ${ENV.PORT}!!!`)
})