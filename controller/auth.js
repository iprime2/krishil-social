const User = require('../models/User')
const CryptoJS = require('crypto-js')
const bcrypt = require('bcrypt')

const register = async (req, res) => {
  const password = req.body.password
  // const encryptPassword = CryptoJS.AES.encrypt(password, process.env.PASS_SEC)

  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = await new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      desc: req.body.desc,
      city: req.body.city,
      from: req.body.from,
      profilePicture: req.body.profilePicture,
      coverPicture: req.body.coverPicture,
      relationship: req.body.relationship,
    })

    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    res.status(500).json(error)
  }
}

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(401).json('user not found')
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      return res.status(400).json('Invalid password')
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  register,
  login,
}
