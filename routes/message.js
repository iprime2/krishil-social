const router = require('express').Router()

const { addMessage, getMessage } = require('../controller/message')

router.post('/', addMessage)
router.get('/:conversationId', getMessage)

module.exports = router
