import express from 'express'
import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

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
    const posts = await Post.find().populate('userid', { username: 1 })
    res.status(200).json({ success: true, data: posts })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error })
  }
})

// Create a post
router.route('/').post(async (req, res) => {
  try {
    const { prompt, photo, userid } = req.body

    const user = await User.findById(userid)

    const photoUrl = await cloudinary.uploader.upload(photo)
    const photoWebp = photoUrl.url.replace(/\.png$/, '.webp')

    const newPost = await Post.create({
      prompt,
      photo: photoWebp,
      userid: user._id
    })

    user.posts = user.posts.concat(newPost._id)
    await user.save()

    res.status(201).json({ success: true, data: newPost })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error })
  }
})

export default router
