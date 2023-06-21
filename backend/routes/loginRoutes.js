import express from 'express'
import jsw from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../mongodb/models/user.js'

const router = express.Router()

router.get('/', async (req, res) => {

})

// Create a user
router.route('/').post(async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password)
    if (!(user && passwordCorrect)) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }

    const userForToken = {
      id: user._id,
      username: user.username
    }

    const token = jsw.sign(userForToken, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 14 })

    res.status(200).json({
      username: user.username,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error })
  }
})

export default router
