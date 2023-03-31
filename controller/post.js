const Post = require('../models/Post')
const User = require('../models/User')

const create = async (req, res) => {
  const newPost = new Post(req.body)

  try {
    const savedPost = await newPost.save()
    res.status(200).json(savedPost)
  } catch (error) {
    res.status(500).json(error)
  }
}

const update = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body })
      res.status(200).json(post)
    } else {
      res.status(403).json('You can only update only your')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.userId === req.body.userId) {
      await post.deleteOne()
      res.status(200).json('the post has been deleted')
    } else {
      res.status(403).json('You can only update only your')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    !post && res.status(404).json('Post not found')
    if (post.likes.includes(req.body.userId)) {
      await post.updateOne({ $pull: { likes: req.body.userId } })
      res.status(200).json('The post has been disliked')
    } else {
      await post.updateOne({ $push: { likes: req.body.userId } })
      console.log(req.body.userId)
      res.status(200).json('The post has been liked')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getTimeline = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId)
    const userPosts = await Post.find({ userId: currentUser._id })
    const friendsPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId })
      })
    )
    res.status(200).json(userPosts.concat(...friendsPosts))
  } catch (error) {
    res.status(500).json(error)
  }
}

const getUserPosts = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
    const posts = await Post.find({ userId: user._id })

    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getAllPosts = async (req, res) => {
  try {
    const post = await Post.find()
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  create,
  update,
  deletePost,
  likePost,
  getPost,
  getTimeline,
  getAllPosts,
  getUserPosts,
}
