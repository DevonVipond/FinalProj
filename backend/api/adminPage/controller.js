const db = require("../../db/index")
const { badRequest, internalError, success } = require("../responseHandler")
const makeReportsFromDb = require('./helpers')

// Returns all reported users where ReportedUsers.adminId == null
const getReportedUsers = async (req, res) => {

    const adminUsername  = req.username

    try {
        const reports = await db.call('GET REPORTED USERS WITHOUT AN ASSIGNED ADMIN', adminUsername)// returns { reportedUsername, timesReported, reporterComments }

        const reportsJSON = makeReportsFromDb(reports)

        success(res, reportsJSON)
    } catch (e) {
        internalError(res, e.toString())
    }
}

const resolveReport = async (req, res) => {

    const { adminId } = req.cookies
    const { reportRowPrimaryKey ,adminComments } = req.body

    if (!reportRowPrimaryKey || !adminComments) {
        badRequest(res, "reportRowPrimaryKey and adminComments required!")
        return
    }

    try {

        const success = await db.call('RESOLVE REPORT', adminId, reportRowPrimaryKey, adminComments)
        if (!success) {
            badRequest(res, "Report does not exist!")
            return
        }

        success(res)
    } catch (e) {

        internalError(res, e.toString())

    }


}

const deleteUser = async (req, res) => {

    const adminUsername  = req.username
    const { usernameOfUserToDelete , reportRowPrimaryKey } = req.body

    if (!usernameOfUserToDelete || !reportRowPrimaryKey) {
        badRequest(res, 'usernameOfUserToDelete and reportRowPrimaryKey required!')
        return
    }

    try {
        const success = await db.call('DELETE USER', adminUsername, usernameOfUserToDelete, reportRowPrimaryKey)

        if (!success) {
            badRequest(res, "User has never been reported!")
            return
        }

        success(res)
    } catch (e) {
        internalError(res, e.toString())
    }

}

const reportFriend = async (req, res) => {

    const adminUsername  = req.username
    const { friendUsername, message } = req.body

    if (!friendUsername || !message) {
        badRequest(res, 'friendUsername and message required!')
        return
    }


    try {

        const success = await db.call('REPORT FRIEND', adminUsername, friendUsername, message) // THIS WILL DELETE THE FRIEND 

        if (!success) {
            badRequest(res, "unable to report friend!")
            return
        }

        success(res)

    } catch (e) {
        internalError(res, e.toString())
    }
}

module.exports = { getReportedUsers, resolveReport, deleteUser, reportFriend }