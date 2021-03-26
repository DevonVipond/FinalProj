const { badRequest, internalError, success } = require("../responseHandler")
const toDTO = require('../toDTO')
const db = require('../../db/index')

const getHome = async (req, res) => {
    try {
        const { username } = req.username

        const friendsDb = await db.exec('GET FRIENDS FOR USER', [username])
        const friends = toDTO.friends(friendsDb.data)

        let matchesDb = await db.exec('GET MATCHES FOR USER', [username])
        let matches = toDTO.matches(matchesDb.data)

        let incomingFriendRequestsDb = await db.exec('GET INCOMING FRIEND REQUESTS FOR USER', [username])
        let incomingFriendRequests = toDTO.friendRequests(incomingFriendRequestsDb.data)

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

        const successDb = await db.exec('CONNECT WITH MATCH', [username, recipientUsername, message])
        const procedureSucceeded = successDb.affectedRows > 0

        if (!procedureSucceeded) {
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

        const successDb = await db.exec('REPORT FRIEND', [username, reportedFriendUsername, message]) // NOTE: This will delete the friendship!
        const procedureSucceededDb = successDb.affectedRows > 0

        if (!procedureSucceededDb) {
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

        const successDb = await db.exec('ACCEPT FRIEND REQUEST', [username, requestorUsername, message] )
        const procedureSucceededDb = successDb.affectedRows > 0

        if (!procedureSucceededDb) {
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

        const successDb = await db.exec('REJECT FRIEND REQUEST', [username, requestorUsername])
        const procedureSucceededDb = successDb.affectedRows > 0

        if (!procedureSucceededDb) {
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
    const { friendUsername, rating } = req.body

    if (!friendUsername || !rating) {
        badRequest(res, 'username of friend required!')
        return
    }

    try {

        const successDb = await db.exec('REVIEW FRIEND', [username, friendUsername, rating])
        const procedureSucceeded = successDb.affectedRows > 0

        if (!procedureSucceeded) {
            badRequest(res, `Friend Review With User ${friendUsername} does not exist!`)
            return
        }

        success(res)

    } catch (e) {

        internalError(e, e.toString())

    }

}

module.exports = { getHome, acceptFriendRequest, connectWithMatch, rejectFriendRequest, reportFriend, reviewFriend }