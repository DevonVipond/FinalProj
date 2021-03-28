const db = require(".././../db/index")
const toDTO = require('../toDTO')
const { success, internalError, badRequest, renameKeys } = require("../responseHandler")
const {ACTIVITY_NAMES, ACCOUNT_TYPES } = require('../../constants')
const {validateType, TYPES} = require('../validators')

const setSettings = async (req, res) => {

    const username  = req.username
    const { activities, distance } = req.body

    try {
        validateType(activities, TYPES.OBJECT)
    } catch (e) {
        badRequest(res, 'activities required' + e.message)
        return
    }

    try {

        const accountTypeDb  = await db.exec('call getUserType(?)', [username] )
        const accountType = toDTO.accountType(accountTypeDb.data)
        if (accountType.toLowerCase() !== ACCOUNT_TYPES.PREMIUM && distance) {
            badRequest(res, 'Only premium users can modify their distance!')
            return
        }
        if (accountType.toLowerCase() !== ACCOUNT_TYPES.PREMIUM && activities.length > 1) {
            badRequest(res, 'Only premium users can set more than 1 activity')
            return
        }

        Object.values(ACTIVITY_NAMES).forEach( async (name) => {
            try {
                await db.exec('call REMOVE_ACTIVITY(?,?)', [username, name.toLowerCase()])
            } catch (e) {}
        })

        activities.forEach( async (value) => {
            const { name, skillLevel } = value
            try {
                await db.exec('call ADD_ACTIVITY(?,?,?)', [username, name.toLowerCase(), skillLevel.toLowerCase()])
            } catch (e) {
                console.log('ADD_ACITVITY failed for ' + name + ' ' + skillLevel)
            }
        })

        if (distance)
            await db.exec('call SET_DISTANCE(?,?)', [username, distance])

        success(res)

    } catch (e) {

        internalError(res, 'setSettings -> ' + e)

    }

}

const getSettingsPage = async (req, res) => {

    let username = req.username

    try {
        const distanceDb   =   await db.exec('call GET_DISTANCE(?)', [username])
        const activitiesDb = await db.exec('call GET_ACTIVITIES(?)', [username])

        let distance = toDTO.distance(distanceDb.data)

        if (!distance) distance = 10

        const response = {
            distance,
            activities: toDTO.activities(activitiesDb.data)
        }

        success(res, response)

    } catch (e) { 

        internalError(res, 'Unable to retrieve settings page ' + e.toString())

    }
}

module.exports = {
    getSettingsPage,
    setSettings
}