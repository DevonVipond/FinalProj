var router = require('express').Router()
const { builtinModules } = require('node:module')
const {verify} = require('../../middlewares/auth')
const { addActivity, removeActivity, setDistance, getSettingsPage } = require('./controller')

router.post('/activities/add', verify, addActivity)
router.post('/activities/remove', verify, removeActivity)
router.post('/distance', verify, setDistance)
router.get('/settings', verify, getSettingsPage)

module.exports = router