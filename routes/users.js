const router = require('express').Router()

const {
  updateUser,
  deleteUser,
  getUser,
  follow,
  unfollow,
  getFriends,
} = require('../controller/users')

router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.get('/', getUser)

router.put('/:id/follow', follow)
router.put('/:id/unfollow', unfollow)

router.get('/friends/:userId', getFriends)

module.exports = router
