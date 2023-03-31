const router = require('express').Router()

const {
  newConversation,
  getConversation,
  findUser,
} = require('../controller/conversation')

router.post('/', newConversation)
router.get('/:userId', getConversation)
router.get('/find/:firstUserId/:secondUserId', findUser)

module.exports = router
