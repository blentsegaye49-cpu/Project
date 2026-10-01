const crypto = require('crypto')
const User = require('../models/User')

const hashPassword = (password) => crypto.createHash('sha256').update(password).digest('hex')

const userResponse = (user) => ({
  id: user._id,
  username: user.username,
  email: user.email,
  role: user.role,
  token: `Bearer_${user._id}`
})

// Your Signup form doesn't ask for a username, but the User model requires
// a unique one — so we build one automatically from the email address.
const generateUsername = async (email) => {
  const base = email.split('@')[0].toLowerCase().replace(/[^a-z0-9._-]/g, '')
  let candidate = base
  let suffix = 1

  while (await User.findOne({ username: candidate })) {
    candidate = `${base}${suffix}`
    suffix += 1
  }

  return candidate
}

const register = async (req, res) => {
  try {
    const { fullName, email, phone, password, role } = req.body

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Full name, email, and password are required.' })
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists.' })
    }

    const username = await generateUsername(email)

    const user = await User.create({
      username,
      fullName,
      phone,
      email: email.toLowerCase(),
      passwordHash: hashPassword(password),
      role: role && ['jobseeker', 'company'].includes(role) ? role : 'jobseeker'
    })

    res.status(201).json({ message: 'Account created successfully.', user: userResponse(user) })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ message: 'Unable to create account.' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' })
    }

    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user || user.passwordHash !== hashPassword(password || '')) {
      return res.status(401).json({ message: 'Email or password is incorrect.' })
    }

    res.status(200).json({ message: 'Login successful.', user: userResponse(user) })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Unable to log in.' })
  }
}

module.exports = { register, login }