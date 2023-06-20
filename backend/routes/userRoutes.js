import express from 'express'
import User from '../mongodb/models/user.js'
import bcrypt from 'bcrypt'

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
    console.log(passwordHashed)
    const newUser = await User.create({ username, password: passwordHashed })
    res.status(201).json({ success: true, data: newUser })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
