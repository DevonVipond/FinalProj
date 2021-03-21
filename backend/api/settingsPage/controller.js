const db = require(".././../db/index")
const { success, internalError, badRequest, renameKeys } = require("../responseHandler")

// INPUT { activityName: string, skillLevel: string }
const addActivity = async (req, res) => {

    const username  = req.username
    const { activityName, skillLevel } = req.body

    if (!activityName || !skillLevel) {
        badRequest(res, `activityName and skillLevel required!`)
        return
    }

    try {

        await db.call('ADD ACTIVITY', [username, activityName, skillLevel]) 

        success(res)

    } catch (e) {

        internalError(res, 'Unable to add activity!' + e)

    }



}

// INPUT { activityName: string }
const removeActivity = async (req, res) => {

    const  username  = req.username
    const { activityName } = req.body

    if (!activityName) {
        badRequest(res, `activityName required!`)
        return
    }

    try {
        const success = await db.call('REMOVE ACTIVITY', [username, activityName]) 

        if (!success) {
            badRequest(res, `User does not have ${activityName} listed`)
            return 
        }

        success(res)
    } catch (e) {
        internalError(res, 'Unable to retrieve settings page' + e)
    }

}

// INPUT { distance: number }
const setDistance = async (req, res) => {

    const username  = req.username
    const { distance } = req.body

    if (!distance) {
        badRequest(res, 'Distance required!')
        return
    }

    try {
        const success = await db.call('SET DISTANCE', [username, distance]) 

        if (!success) {
            badRequest(res, `Unable to set distance to: ${distance}`)
            return
        }

        success(200)

    } catch (e) { 
        internalError(res, 'Unable to retrieve settings page' + e)
    }

}

const getSettingsPage = async (req, res) => {

    let username = req.username
    if (!username) username = 'adolf'

    try {
        const getDistanceResult   =   await db.call('call GET_DISTANCE(?)', [username]) 
        const getActivitiesResult = await db.call('call GET_ACTIVITIES(?)', [username]) 

        let distance = db.findResults(getDistanceResult, 'Distance')
        console.log('found distance \n\n', distance)
        let activities = db.findResults(getActivitiesResult)
        console.log('found activities \n\n', activities)

        if (!distance) {
            badRequest(res, `unable to retrieve distance`)
            return
        }

        if (!activities) {
            badRequest(res, `unable to retrieve activities`)
            return
        }

        activities = renameKeys(activities, 'Activity', 'name', true)
        activities = renameKeys(activities, 'SkillLevel', 'skillLevel', true)
        const response = {
            distance,
            activities
        }
        console.log('building response: ', JSON.stringify(response))

        success(res, response)

    } catch (e) { 

        internalError(res, 'Unable to retrieve settings page ' + e.toString())

    }
}

module.exports = {
    addActivity: addActivity,
    removeActivity: removeActivity,
    setDistance: setDistance,
    getSettingsPage: getSettingsPage,
}