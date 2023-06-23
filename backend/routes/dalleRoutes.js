import express from 'express'
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'
import jsw from 'jsonwebtoken'

dotenv.config()

const router = express.Router()

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })

const openai = new OpenAIApi(configuration)

router.route('/').get((req, res) => {
  res.send('Hello from dalleroutes')
})

router.route('/').post(async (req, res) => {
  try {
    const autorization = req.headers.authorization
    const { prompt } = req.body

    let token = null

    if (autorization && autorization.toLowerCase().startsWith('bearer')) {
      token = autorization.substring(7)
    }

    let decodedToken = {}
    try {
      decodedToken = jsw.verify(token, process.env.JWT_SECRET)
    } catch (error) {
      console.log(error)
    }

    if (!token || !decodedToken.username) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json'
    })

    const image = aiResponse.data.data[0].b64_json

    res.status(200).json({ photo: image })
  } catch (error) {
    console.log(error)
    res.status(500).send(error?.response.data.error.message)
  }
})

export default router
