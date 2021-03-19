import { badRequest, internalError, success } from "../responseHandler"

const db = require('../../db/index')

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
    const { recipientUsername, message } = req.body

    if (!recipientUsername || !message) {
        badRequest(res, 'recipientUsername and message required!')
        return
    }

    try {

        const success = await db.call('CONNECT WITH MATCH', [username, recipientUsername, message])

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
    const { reportedFriendUsername, message } = req.body

    if (!reportedFriendUsername, !message) {
        badRequest(res, 'username of reported friend required')
        return
    }

    try {

        const success = await db.call('REPORT FRIEND', username, reportedFriendUsername, message) // NOTE: This will delete the friendship!
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
    const { requestorUsername, message } = req.body

    if (!requestorUsername || !message) {
        badRequest(res, 'username of friend and message required!')
        return
    }

    try {

        const success = await db.call('ACCEPT FRIEND REQUEST', username, requestorUsername, message)

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
    getHome, acceptFriendRequest, connectWithMatch, rejectFriendRequest, reportFriend
}