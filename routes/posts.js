const router = require('express').Router()

const {
  create,
  update,
  deletePost,
  likePost,
  getPost,
  getTimeline,
  getAllPosts,
  getUserPosts,
} = require('../controller/post')

router.post('/', create)
router.put('/:id', update)
router.delete('/:id', deletePost)
router.put('/:id/like', likePost)
router.get('/:id', getPost)
router.get('/', getAllPosts)
router.get('/timeline/:userId', getTimeline)
router.get('/profile/:username', getUserPosts)

module.exports = router
