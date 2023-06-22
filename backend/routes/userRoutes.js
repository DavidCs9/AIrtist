import express from 'express'
import User from '../mongodb/models/user.js'
import bcrypt from 'bcrypt'
import jsw from 'jsonwebtoken'

const router = express.Router()

router.get('/', async (req, res) => {
  const users = await User.find({}).populate('posts', { prompt: 1, photo: 1 })
  res.status(200).json(users)
})

// Create a user
router.route('/').post(async (req, res) => {
  const { username, password } = req.body
  try {
    const passwordHashed = await bcrypt.hash(password, 10)
    await User.create({ username, password: passwordHashed })
    const userForToken = {
      username
    }

    const token = jsw.sign(userForToken, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 14 })
    res.status(201).json({
      username,
      token
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
