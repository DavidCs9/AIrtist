import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './mongodb/connect.js'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'
import userRoutes from './routes/userRoutes.js'
import loginRoutes from './routes/loginRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.get('/', (req, res) => {
  res.send('Hello from backend')
})

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/login', loginRoutes)

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URI)
    app.listen(8080, () => {
      console.log('Server is running on port 8080')
    })
  } catch (error) {
    console.log(error)
  }
}

startServer()
