import express from 'express'
import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import jsw from 'jsonwebtoken'

import Post from '../mongodb/models/post.js'
import User from '../mongodb/models/user.js'

dotenv.config()

const router = express.Router()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Get all posts
router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(200).json({ success: true, data: posts })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error })
  }
})

// Create a post
router.route('/').post(async (req, res) => {
  try {
    const autorization = req.headers.authorization
    const { prompt, photo } = req.body

    const photoUrl = await cloudinary.uploader.upload(photo)
    const photoWebp = photoUrl.url.replace(/\.png$/, '.webp')

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

    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    const { id: userid } = decodedToken
    const user = await User.findById(userid)

    const newPost = await Post.create({
      prompt,
      photo: photoWebp,
      user: user.username
    })

    user.posts = user.posts.concat(newPost._id)
    await user.save()

    res.status(201).json({ success: true, data: newPost })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router
