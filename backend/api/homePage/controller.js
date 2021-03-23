const { badRequest, internalError, success } = require("../responseHandler")
const toDTO = require('../toDTO')
const db = require('../../db/index')

const getHome = async (req, res) => {
    try {
        const { username } = req.username

        const friendsDb = await db.procedure('GET FRIENDS FOR USER', [username])
        const friends = toDTO.friends(friendsDb)

        let matchesDb = await db.procedure('GET MATCHES FOR USER', [username])
        let matches = toDTO.matches(matchesDb)

        let incomingFriendRequestsDb = await db.procedure('GET INCOMING FRIEND REQUESTS FOR USER', [username])
        let incomingFriendRequests = toDTO.friendRequests(incomingFriendRequestsDb)

        const response = { friends, matches, incomingFriendRequests }

        success(res, response)

    } catch (e) {
        internalError(res, e.toString())
    }
}

const connectWithMatch = async (req, res) => {

    const { username } = req.username
    const { recipientUsername, message } = req.body

    if (!recipientUsername || !message) {
        badRequest(res, 'recipientUsername and message required!')
        return
    }

    try {

        const successDb = await db.procedure('CONNECT WITH MATCH', [username, recipientUsername, message])
        const success = toDTO.wasSuccessful(successDb)

        if (!success) {
            badRequest(res, 'Unable to connect to match!')
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

    if (!reportedFriendUsername || !message) {
        badRequest(res, 'username of reported friend required')
        return
    }

    try {

        const successDb = await db.procedure('REPORT FRIEND', [username, reportedFriendUsername, message]) // NOTE: This will delete the friendship!
        const success = toDTO.wasSuccessful(successDb)

        if (!success) {
            badRequest(res, 'Unable to report friend!')
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

        const successDb = await db.procedure('ACCEPT FRIEND REQUEST', [username, requestorUsername, message] )
        const success = toDTO.wasSuccessful(successDb)

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

        const successDb = await db.procedure('REJECT FRIEND REQUEST', [username, requestorUsername])
        const success = toDTO.wasSuccessful(successDb)

        if (!success) {
            badRequest(res, `Friend Request With User ${requestorUsername} does not exist!`)
            return
        }

        success(res)

    } catch (e) {

        internalError(e, e.toString())

    }

}
const reviewFriend = async (req, res) => { 
    const { username } = req.username
    const { friendUsername, message } = req.body

    if (!friendUsername || message) {
        badRequest(res, 'username of friend required!')
        return
    }

    try {

        const successDb = await db.procedure('REVIEW FRIEND', [username, friendUsername, message])
        const success = toDTO.wasSuccessful(successDb)

        if (!success) {
            badRequest(res, `Friend Review With User ${friendUsername} does not exist!`)
            return
        }

        success(res)

    } catch (e) {

        internalError(e, e.toString())

    }

}

module.exports = { getHome, acceptFriendRequest, connectWithMatch, rejectFriendRequest, reportFriend, reviewFriend }