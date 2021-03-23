const db = require(".././../db/index")
const toDTO = require('../toDTO')
const { success, internalError, badRequest, renameKeys } = require("../responseHandler")
const {ACTIVITY_NAMES, ACCOUNT_TYPES } = require('../../constants')

// Should probably rename this to set activities
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
                await db.call('call REMOVE_ACTIVITY(?,?)', [username, activityName.toLowerCase()])
            } catch (e) {}
        })

        activities.forEach( async (value) => {
            const { activityName, skillLevel } = value
            await db.call('call ADD_ACTIVITY(?,?,?)', [username, activityName.toLowerCase(), skillLevel.toLowerCase()])
        })

        if (distance)
            await db.call('call SET_DISTANCE(?,?)', [username, distance])

        success(res)

    } catch (e) {

        internalError(res, 'setActivities -> ' + e)

    }

}

const getSettingsPage = async (req, res) => {

    let username = req.username

    try {
        const distanceDb   =   await db.procedure('call GET_DISTANCE(?)', [username])
        const activitiesDb = await db.procedure('call GET_ACTIVITIES(?)', [username])

        let distance = toDTO.distance(distanceDb)

        if (!distance) distance = 10

        const response = {
            distance,
            activities: toDTO.activities(activitiesDb)
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