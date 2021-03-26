var router = require('express').Router()
const {verify} = require('../../middlewares/auth')
const { getHome, acceptFriendRequest, connectWithMatch, rejectFriendRequest, reportFriend, reviewFriend } = require('./controller')

router.get('/user/home', verify, getHome)
router.post('/friend-requests/accept', verify, acceptFriendRequest)
router.post('/friend-requests/reject', verify, rejectFriendRequest)
router.post('/matches/connect', verify, connectWithMatch)
router.post('/friends/report', verify, reportFriend)
router.post('/friends/review', verify, reviewFriend)

module.exports = router
