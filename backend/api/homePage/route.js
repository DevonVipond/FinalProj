var router = require('express').Router()
const {verify} = require('../../middlewares/auth')
const { getHome, acceptFriendRequest, connectWithMatch, rejectFriendRequest } = require('./controller')

router.get('/home', verify, getHome)
router.post('/friend-requests/accept', verify, acceptFriendRequest)
router.post('/friend-requests/reject', verify, rejectFriendRequest)
router.post('/matches/connect', verify, connectWithMatch)

module.exports = router
