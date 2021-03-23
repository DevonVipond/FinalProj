const db = require(".././../db/index")
const toDTO = require('../toDTO')
const { success, internalError, badRequest, renameKeys } = require("../responseHandler")
const {ACTIVITY_NAMES, ACCOUNT_TYPES } = require('../../constants')

const setSettings = async (req, res) => {

    const username  = req.username
    const { activities, distance } = req.body

    if (!activities) {
        badRequest(res, 'activities required')
    }

    try {

        //const accountType  = await db.call('call getUserType', [username] )[0]
        //if (accountType.toLowerCase() !== ACCOUNT_TYPES.PREMIUM && distance) {
        //    badRequest(res, 'Only premium users can modify their distance!')
        //    return
        //}

        Object.values(ACTIVITY_NAMES).forEach( async (activityName) => {
            try {
                await db.exec('call REMOVE_ACTIVITY(?,?)', [username, activityName.toLowerCase()])
            } catch (e) {}
        })

        activities.forEach( async (value) => {
            const { activityName, skillLevel } = value
            await db.exec('call ADD_ACTIVITY(?,?,?)', [username, activityName.toLowerCase(), skillLevel.toLowerCase()])
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