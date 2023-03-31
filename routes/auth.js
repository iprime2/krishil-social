const router = require('express').Router()

const { register, login } = require('../controller/auth')

router.post('/login', login)
router.post('/register', register)

module.exports = router
