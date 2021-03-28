const { badRequest, internalError, success } = require("../responseHandler")
const {validateType, TYPES} = require('../validators')
const toDTO = require('../toDTO')
const db = require('../../db/index')


const getUserSettings = async (username) => {
    validateType(username, TYPES.STRING)
    const distanceDb   =  await db.exec('call GET_DISTANCE(?)', [username])
    const activitiesDb = await db.exec('call GET_ACTIVITIES(?)', [username])

    let distance = toDTO.distance(distanceDb.data)
    let activities = toDTO.activities(activitiesDb.data)

    return {distance, activities}
}
const calculateDistance = (user1Long, user1Lat, user2Lat, user2Long) => {
    validateType(user1Long, TYPES.STRING)
    validateType(user1Lat, TYPES.STRING)
    validateType(user2Lat, TYPES.STRING)
    validateType(user2Long, TYPES.STRING)
    const deltaLong = user1Long - user2Long
    const deltaLat = user1Lat - user2Lat

    return Math.sqrt(Math.pow(deltaLat, 2), Math.pow(deltaLong, 2))
}

const filterMatches = (originLong, originLat, matches) => {
    validateType(originLong, TYPES.STRING)
    validateType(originLat, TYPES.STRING)
    validateType(matches, TYPES.OBJECT)
    let matchesWithDistance = []
    matches.forEach((m) => {
        const {latitude, longitude} = m
        validateType(latitude, TYPES.STRING)
        validateType(longitude, TYPES.STRING)

        const distance = calculateDistance(originLong, originLat, latitude, longitude)
        if (distance <= m.distance) {
            m.distance = distance
            matchesWithDistance.push(m)
        }

    })

    let matchesSortedByDistance = matchesWithDistance.sort(function (lhs, rhs) {
        return lhs.distance < rhs.distance
    })

    let finializedMatches = []
    for (let i = 0; i < matchesSortedByDistance.length && i < 10; i++) {
        finializedMatches.push(matchesSortedByDistance[i])
    }

    return finializedMatches
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

        const locationDb =  await db.exec('call getLocation(?)', [ username ])
        const userLocation = toDTO.location(locationDb.data)

        const friendsDb = await db.exec('call getFriends(?)', [username])
        let friends = toDTO.users(friendsDb.data)
        for (let i=0; i<friends.length; i++) {
            const {  activities } = await getUserSettings(friends[i].username)
            friends[i].activities = activities
        }


        let matchesDb = await db.exec('call getMatches(?)', [username])
        let matches = toDTO.users(matchesDb.data)
        for (let i=0; i<matches.length; i++) {
            const {  activities } = await getUserSettings(matches[i].username)
            matches[i].activities = activities
        }
        matches = filterMatches(userLocation.longitude, userLocation.latitude, matches)

        matches = matches.map(m => {
            delete m.latitude
            delete m.longitude
            return m
        })

        let incomingFriendRequestsDb = await db.exec('call incomingFriendRequests(?)', [username])
        let incomingFriendRequests = toDTO.users(incomingFriendRequestsDb.data)
        for (let i=0; i<incomingFriendRequests.length; i++) {
            const {  activities } = await getUserSettings(incomingFriendRequests[i].username)
            incomingFriendRequests[i].activities = activities
        }

        const response = { friends, matches, incomingFriendRequests }

        success(res, response)

    } catch (e) {
        internalError(res, e.toString())
    }
}

const connectWithMatch = async (req, res) => {

    const  username  = req.username
    const { recipientUsername, message } = req.body

    try {
        validateType(username, TYPES.STRING)
        validateType(recipientUsername, TYPES.STRING)
        validateType(message, TYPES.STRING)
    } catch (e) {
        badRequest(res, e.message)
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

    try {
        validateType(reportedFriendUsername, TYPES.STRING)
        validateType(message, TYPES.STRING)
    } catch (e) {
        badRequest(res, 'username of reported friend and message required')
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

    try {
        validateType(requestorUsername, TYPES.STRING)
        validateType(username, TYPES.STRING)
    } catch (e) {
        badRequest(res, 'username of friend requestor required!')
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

    try {
        validateType(requestorUsername, TYPES.STRING)
        validateType(username, TYPES.STRING)
    } catch (e) {
        badRequest(res, 'username of friend requestor required!')
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