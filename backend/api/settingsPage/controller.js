

const { builtinModules } = require("node:module")
const db = require(".././../db/index")
const { success, internalError, badRequest } = require("../responseHandler")

const makeRequestHandler = async (req, res, handle) => {
    try {
        handle(req, res)
    } catch (e) {
        console.error("makeRequestHandler -> Exception: " + e)
        internalError(req, e.toString())
    }
}

// INPUT { activityName: string, skillLevel: string }
const addActivity = async (req, res) => {

    const { userId } = req.cookies
    const { activityName, skillLevel } = req.body

    if (!activityName, !skillLevel) {
        badRequest(res, `activityName and skillLevel required!`)
        return
    }

    try {

        await db.call('ADD ACTIVITY', userId, activityName, skillLevel) 

    } catch (e) { throw e }

    success(res)


}

// INPUT { activityName: string }
const removeActivity = async (req, res) => {

    const { userId } = req.cookies
    const { activityName } = req.body

    if (!activityName) {
        badRequest(res, `activityName required!`)
        return
    }

    try {
        const success = await db.call('REMOVE ACTIVITY', userId, activityName) 

        if (!success) {
            badRequest(res, `User does not have ${activityName} listed`)
            return 
        }

        success(res)
    } catch (e) { throw e }

}

// INPUT { distance: number }
const setDistance = async (req, res) => {

    const { userId } = req.cookies
    const { distance } = req.body

    if (!distance) {
        badRequest(res, 'Distance required!')
        return
    }

    try {
        const success = await db.call('SET DISTANCE', userId, distance) 

        if (!success) {
            badRequest(res, `Unable to set distance to: ${distance}`)
            return
        }

        success(200)

    } catch (e) { throw e}

}

const getSettingsPage = (req, res) => {

    const { userId } = req.cookies

    try {
        const distance   =   await db.call('GET DISTANCE', userId) 
        const activities = await db.call('GET ACTIVITIES', userId) 
        if (!distance) {
            badRequest(res, `unable to retrieve distance`)
            return
        }
        if (!activities) {
            badRequest(res, `unable to retrieve distance`)
            return
        }

        const distanceJSON = makeDistanceFromDb(distance)
        const activitiesJSON = makeActivitiesFromDb(activities)

        const response = {
            distance: distanceJSON,
            activities: activitiesJSON
        }

        success(res, response)

    } catch (e) { throw e }
}

module.exports = {
    addActivity: makeRequestHandler(addActivity),
    removeActivity: makeRequestHandler(removeActivity),
    setDistance: makeRequestHandler(setDistance),
    getSettingsPage: makeRequestHandler(getSettingsPage),
}