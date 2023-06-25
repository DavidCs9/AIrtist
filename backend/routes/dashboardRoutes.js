import express from 'express'
import jsw from 'jsonwebtoken'

import Post from '../mongodb/models/post.js'

const router = express.Router()

router.route('/').get(async (req, res) => {
  const autorization = req.headers.authorization
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

  const { username } = decodedToken
  const posts = await Post.find({ user: username })
  res.status(200).json({ success: true, posts })
})

router.route('/').post(async (req, res) => {
  const { _id } = req.body

  try {
    await Post.findByIdAndDelete(_id)
    res.status(200).json({ success: true, message: `Post with id ${_id} deleted` })
  } catch (error) {
    console.log(error)
    res.status(404).json({ success: false, message: `Post with id ${_id} does not exist` })
  }
})

export default router
