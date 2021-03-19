var router = require('express').Router()
const {verify} = require('../../middlewares/auth')
const { userLogin, logout, adminLogin, register, getAccountType } = require('./controller')

router.post('/user/register', register)
router.post('/user/login', userLogin)
router.get('/user/account-type', verify, getAccountType)
router.post('/logout', verify, logout)
router.post('/admin/login', adminLogin)

module.exports = router