var router = require('express').Router()
const {verify} = require('../../middlewares/auth')
const { userLogin, logout, adminLogin, register } = require('./controller')

router.post('/user/register', register)
router.post('/user/login', userLogin)
router.post('/logout', verify, logout)
router.post('/admin/login', verify, adminLogin)

module.exports = router