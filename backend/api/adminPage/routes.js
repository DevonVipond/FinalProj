

var router = require('express').Router()
const {verify} = require('../../middlewares/auth')
const { getUncheckedReports, resolveReport, deleteUser } = require('./controller')

router.get('/admin/home', verify, getUncheckedReports)
router.post('/reports/resolve', verify, resolveReport)
router.post('/users/delete', verify, deleteUser)

module.exports = router
