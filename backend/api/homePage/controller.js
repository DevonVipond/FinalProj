import { badRequest, internalError, success } from "../responseHandler"

const db = []

const getHome = async (req, res) => {
    const { username } = req.username

    try {
        const friends = await db.call('GET FRIENDS FOR USER', username) 
        const matches = await db.call('GET MATCHES FOR USER', username) 
        const incomingFriendRequests = await db.call('GET INCOMING FRIEND REQUESTS FOR USER', username) 
    } catch (e) {
        internalError(res, e.toString())
    }

    const friendsJSON = makeFriendsFromDb(friends)
    const matchesJSON = makeMatchesFromDb(matches)
    const incomingFriendRequestsJSON = makeIncomingFriendRequestsFromDb(incomingFriendRequests)

    const responseBody = {
        friends: friendsJSON,
        matches: matchesJSON,
        incomingFriendRequests: incomingFriendRequestsJSON,
    }

    success(res, responseBody)
}

const connectWithMatch = async (req, res) => {

    const { username } = req.username
    const { recipientUsername } = req.body

    if (!recipientUsername) {
        badRequest(res, 'recipientUsername required!')
        return
    }

    try {

        const success = await db.call('CONNECT WITH MATCH', username, recipientUsername)
        if (!success) {
            badRequest('Unable to connect to match!')
            return
        }

        success(res)

    } catch (e) {

        internalError(e, e.toString())

    }

}

const reportFriend = async (req, res) => {

    const { username } = req.username
    const { reportedFriendUsername } = req.body

    if (!reportedFriendUsername) {
        badRequest(res, 'username of reported friend required')
        return
    }

    try {

        const success = await db.call('REPORT FRIEND', username, reportedFriendUsername)
        if (!success) {
            badRequest('Unable to connect to match!')
            return
        }

        success(res)

    } catch (e) {

        internalError(e, e.toString())

    }

}

const acceptFriendRequest = async (req, res) => {
    const { username } = req.username
    const { friendUsername: requestorUsername } = req.body

    if (!requestorUsername) {
        badRequest(res, 'username of friend required!')
        return
    }

    try {

        const success = await db.call('ACCEPT FRIEND REQUEST', username, requestorUsername)

        if (!success) {
            badRequest(`Friend Request With User ${requestorUsername} does not exist!`)
            return
        }

        success(res)

    } catch (e) {

        internalError(e, e.toString())

    }

}

const rejectFriendRequest = async (req, res) => {
    const { username } = req.username
    const { requestorUsername } = req.body

    if (!requestorUsername) {
        badRequest(res, 'username of friend required!')
        return
    }

    try {

        const success = await db.call('REJECT FRIEND REQUEST', username, requestorUsername)

        if (!success) {
            badRequest(`Friend Request With User ${requestorUsername} does not exist!`)
            return
        }

        success(res)

    } catch (e) {

        internalError(e, e.toString())

    }

}

module.exports = {
    getHome, acceptFriendRequest, connectWithMatch, rejectFriendRequest
}