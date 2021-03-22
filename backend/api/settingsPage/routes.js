var router = require('express').Router()
const {verify} = require('../../middlewares/auth')
const { getSettingsPage, setSettings } = require('./controller')

//router.post('/activities/add', verify, addActivity)
//router.post('/activities/set', verify, setActivities)
//router.post('/activities/remove', verify, removeActivity)
//router.post('/distance', verify, setDistance)
router.get('/settings', verify, getSettingsPage)
router.post('/settings', verify, setSettings)

module.exports = router