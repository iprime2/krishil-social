const User = require('../models/User')
const bcrypt = require('bcrypt')

const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
      } catch (error) {
        res.status(500).json(error)
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      })
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    return res.status(403).json('You can update only your account')
  }
}

const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id)

      //!user && res.status(401).json('user not found')

      res.status(200).json('Account deleted successfully')
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    return res.status(403).json('You can delete only your account')
  }
}

const getUser = async (req, res) => {
  const userId = req.query.userId
  const username = req.query.username

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username })
    const { password, updateAt, ...other } = user._doc

    //!user && res.status(401).json('user not found')

    res.status(200).json(other)
  } catch (error) {
    res.status(500).json(error)
  }
}

const follow = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } })
        await currentUser.updateOne({ $push: { following: req.params.id } })
        res.status(200).json('user has been followed')
      } else {
        res.status(403).json('you already follow this user')
      }
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json("you can't follow yourseld")
  }
}

const unfollow = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } })
        await currentUser.updateOne({ $pull: { following: req.params.id } })
        res.status(200).json('user has been unfollowed')
      } else {
        res.status(403).json('you already unfollowed this user')
      }
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json("you can't unfollow yourseld")
  }
}

const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    !user && res.status(404).json('User not found')

    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId)
      })
    )

    let friendList = []
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend
      friendList.push({ _id, username, profilePicture })
    })

    console.log(friendList)
    res.status(200).json(friendList)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  follow,
  unfollow,
  getFriends,
}
