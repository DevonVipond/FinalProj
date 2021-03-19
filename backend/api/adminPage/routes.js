

var router = require('express').Router()
const {verify} = require('../../middlewares/auth')
const { getReportedUsers, resolveReport, deleteUser } = require('./controller')

router.get('/reports', verify, getReportedUsers)
router.post('/reports/resolve', verify, resolveReport)
router.post('/users/delete', verify, deleteUser)

module.exports = router
