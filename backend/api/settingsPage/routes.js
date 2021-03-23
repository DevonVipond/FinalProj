var router = require('express').Router()
const {verify} = require('../../middlewares/auth')
const { getSettingsPage, setSettings } = require('./controller')

router.get('/settings', verify, getSettingsPage)
router.post('/settings', verify, setSettings)

module.exports = router