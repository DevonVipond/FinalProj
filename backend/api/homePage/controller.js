const { badRequest, internalError, success, unauthorized } = require("../responseHandler")
const {validateType, TYPES} = require('../validators')
const { isAdmin } = require('../adminPage/controller')
const toDTO = require('../toDTO')
const db = require('../../db/index')

const calculateDistance = (user1Long, user1Lat, user2Lat, user2Long) => {
    //validateType(user1Long, TYPES.STRING)
    //validateType(user1Lat, TYPES.STRING)
    //validateType(user2Lat, TYPES.STRING)
    //validateType(user2Long, TYPES.STRING)
    const deltaLong = user1Long - user2Long
    const deltaLat = user1Lat - user2Lat

    return Math.sqrt(Math.pow(deltaLat, 2), Math.pow(deltaLong, 2)).toFixed(2)
}

const makeUserResponse = async (usersDb, authUserLat, authUserLong) => {
    validateType(usersDb, TYPES.OBJECT)
    validateType(authUserLat, TYPES.STRING)
    validateType(authUserLong, TYPES.STRING)

    usersDb = usersDb.filter(u => {
        return u.UserName !== null
    })

    let activitiesForUser = {}

    usersDb.forEach(value => {
        const { UserName, Activity, SkillLevel }  = value
        if (Activity && SkillLevel) {
            if (!activitiesForUser[UserName])
                activitiesForUser[UserName] = []

            activitiesForUser[UserName].push({name: Activity.toLowerCase(), skillLevel: SkillLevel.toLowerCase()})
        }
    })

    const usersWithActivitiesAndRelativeDistance =  usersDb.map(u => {
        const { UserName, Distance, Latitude, Longitude, message }  = u
        const distanceFromAuthUser = calculateDistance(Longitude, Latitude, authUserLat, authUserLong)
        if (distanceFromAuthUser > Distance) return {}

        let activities = activitiesForUser[UserName] ? activitiesForUser[UserName] : []


        const attrs =  {
            username: UserName,
            distance: distanceFromAuthUser,
            activities,
        }
        if (message) attrs.message = message

        return attrs
    }).filter(u => { return u.username })

    let ret = {}
    for (let user of usersWithActivitiesAndRelativeDistance) {
        const { username } = user
        validateType(username, TYPES.STRING)

        ret[username] = user
        try {
            ret[username].averageReviewScore = await getAverageReviewScore(username)
        } catch(e) { throw e }
    }

    return Object.values(ret)
}

async function getAverageReviewScore(username) {
    validateType(username, TYPES.STRING)
    try {
        const averageReviewScoreDb = await db.exec('call GET_RATING(?)', [ username ])
        const reviewScore =  averageReviewScoreDb.data[0]['AVG(reviewScore)']
        if (!reviewScore) return null

        return reviewScore
    } catch (e) { throw e }
}

const getHome = async (req, res) => {
    try {
        const username = req.username

        try {
            validateType(username, TYPES.STRING)
        } catch (e) {
            badRequest(res, e.message)
            return
        }

        const isUserAdmin = await isAdmin(username)
        if (isUserAdmin) {
            unauthorized(res)
            return
        }

        const locationDb =  await db.exec('call getLocation(?)', [ username ])
        const userLocation = toDTO.location(locationDb.data)

        const friendsDb = await db.exec('call getFriends(?)', [username])
        const friends = await makeUserResponse(friendsDb.data, userLocation.latitude, userLocation.longitude)

        let matchesDb = await db.exec('call getMatches(?)', [username])
        const matches = await makeUserResponse(matchesDb.data, userLocation.latitude, userLocation.longitude)

        let incomingFriendRequestsDb = await db.exec('call incomingFriendRequests(?)', [username])
        const incomingFriendRequests = await makeUserResponse(incomingFriendRequestsDb.data, userLocation.latitude, userLocation.longitude)

        validateType(friends, TYPES.OBJECT)
        validateType(matches, TYPES.OBJECT)
        validateType(incomingFriendRequests, TYPES.OBJECT)
        const response = { friends, matches, incomingFriendRequests }

        success(res, response)

    } catch (e) {
        internalError(res, e.toString())
    }
}

const connectWithMatch = async (req, res) => {

    const  username  = req.username
    const { recipientUsername, message } = req.body

    const isUserAdmin = await isAdmin(username)
    if (isUserAdmin) {
        unauthorized(res)
        return
    }

    try {
        validateType(username, TYPES.STRING)
        validateType(recipientUsername, TYPES.STRING)
        validateType(message, TYPES.STRING)
    } catch (e) {
        badRequest(res, e.message)
        return
    }

    if (recipientUsername === username) {
        badRequest(res, "Invalid params")
        return
    }

        try {

        const successDb = await db.exec('call sendConnectionReq(?,?,?)', [username, recipientUsername, message])
        const procedureSucceeded = successDb.affectedRows > 0

        if (!procedureSucceeded) {
            badRequest(res, 'Unable to connect to match!')
            return
        }

        success(res)

    } catch (e) {

        internalError(res, e.toString())

    }

}

const reportFriend = async (req, res) => {

    const  username  = req.username
    const { reportedFriendUsername, message } = req.body

    const isUserAdmin = await isAdmin(username)
    if (isUserAdmin) {
        unauthorized(res)
        return
    }

    try {
        validateType(reportedFriendUsername, TYPES.STRING)
        validateType(message, TYPES.STRING)
    } catch (e) {
        badRequest(res, 'username of reported friend and message required')
        return
    }

    if (reportedFriendUsername === username) {
        badRequest(res, "Invalid params")
        return
    }

    try {

        const successDb = await db.exec('call reportFriend(?,?,?)', [username, reportedFriendUsername, message]) // NOTE: This will delete the friendship!
        const procedureSucceededDb = successDb.affectedRows > 0

        if (!procedureSucceededDb) {
            badRequest(res, 'Unable to report friend!')
            return
        }

        success(res)

    } catch (e) {

        internalError(res, e.toString())

    }

}

const acceptFriendRequest = async (req, res) => {

    const  username  = req.username
    const { requestorUsername } = req.body

    const isUserAdmin = await isAdmin(username)
    if (isUserAdmin) {
        unauthorized(res)
        return
    }

    try {
        validateType(requestorUsername, TYPES.STRING)
        validateType(username, TYPES.STRING)
    } catch (e) {
        badRequest(res, 'username of friend requestor required!')
        return

    }

    if (requestorUsername === username) {
        badRequest(res, "Invalid params")
        return
    }

    try {

        const successDb = await db.exec('call acceptRequest(?,?)', [username, requestorUsername] )
        const procedureSucceededDb = successDb.affectedRows > 0

        if (!procedureSucceededDb) {
            badRequest(`Friend Request With User ${requestorUsername} does not exist!`)
            return
        }

        success(res)

    } catch (e) {

        internalError(res, e.toString())

    }

}

const rejectFriendRequest = async (req, res) => {
    const  username  = req.username
    const { requestorUsername } = req.body

    const isUserAdmin = await isAdmin(username)
    if (isUserAdmin) {
        unauthorized(res)
        return
    }

    try {
        validateType(requestorUsername, TYPES.STRING)
        validateType(username, TYPES.STRING)
    } catch (e) {
        badRequest(res, 'username of friend requestor required!')
        return

    }

    if (requestorUsername === username) {
        badRequest(res, "Invalid params")
        return
    }

    try {

        const successDb = await db.exec('call rejectRequest(?,?)', [username, requestorUsername])
        const procedureSucceededDb = successDb.affectedRows > 0

        if (!procedureSucceededDb) {
            badRequest(res, `Friend Request With User ${requestorUsername} does not exist!`)
            return
        }

        success(res)

    } catch (e) {

        internalError(res, e.toString())

    }

}
const reviewFriend = async (req, res) => {

    const  username  = req.username
    const { friendUsername, rating } = req.body

    const isUserAdmin = await isAdmin(username)
    if (isUserAdmin) {
        unauthorized(res)
        return
    }

    validateType(username, TYPES.STRING)

    try {
        validateType(friendUsername, TYPES.STRING)
    } catch (e) {
        badRequest(res, 'username of friend required!')
        return
    }

    try {
        validateType(rating, TYPES.STRING)
    } catch (e) {
        badRequest(res, 'rating required')
        return
    }

    if (rating != '1' && rating != '2' && rating != '3' && rating != '4' && rating != '5') {
        badRequest(res, 'rating must be a score out of 5! ' + rating)
        return
    }

    if (friendUsername === username) {
        badRequest(res, "Invalid params")
        return
    }
    try {

        const successDb = await db.exec('call reviewFriend(?,?,?)', [username, friendUsername, rating])
        const procedureSucceeded = successDb.affectedRows > 0

        if (!procedureSucceeded) {
            badRequest(res, `Friend Review With User ${friendUsername} does not exist!`)
            return
        }

        success(res)

    } catch (e) {

        internalError(res, e.toString())

    }

}

module.exports = { getHome, acceptFriendRequest, connectWithMatch, rejectFriendRequest, reportFriend, reviewFriend }