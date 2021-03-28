const db = require("../../db/index")
const { badRequest, internalError, success } = require("../responseHandler")
const toDTO = require('../toDTO')

const isAdmin = async (username) => {

    try {
        const accountTypeDb  = await db.exec('call getUserType(?)', [username] )
        const accountType = toDTO.accountType(accountTypeDb.data)

        return accountType.toUpperCase() === "ADMIN"

    } catch (e) {
        return true
    }
}

// Returns all reported users where ReportedUsers.adminId == null
const getUncheckedReports = async (req, res) => {

    try {

        const adminUsername = req.username

        const isUserAdmin = await isAdmin(adminUsername)
        if (!isUserAdmin) {
            badRequest(res, "Only admins can access this endpoint!")
            return
        }

        const reportedUsersDb = await db.exec('call GET_UNCHECKED_REPORTS()', [])// returns {primaryKey, reportedUsername, timesReported, reporterComments }
        const reportedUsers = toDTO.reportedUsers(reportedUsersDb.data)

        success(res, reportedUsers)

    } catch (e) {
        internalError(res, e.toString())
    }
}

const resolveReport = async (req, res) => {

    const adminUsername = req.username
    const { reportRowPrimaryKey ,adminComments } = req.body

    if (!reportRowPrimaryKey || !adminComments) {
        badRequest(res, "reportRowPrimaryKey and adminComments required!")
        return
    }

    const isUserAdmin = await isAdmin(adminUsername)
    if (!isUserAdmin) {
        badRequest(res, "Only admins can access this endpoint!")
        return
    }

    try {

        const successDb = await db.exec('call RESOLVE_REPORT(?,?,?)', [adminUsername, reportRowPrimaryKey, adminComments])
        const procedureSucceeded = toDTO.wasSuccessful(successDb)

        if (!procedureSucceeded) {
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

    const isUserAdmin = await isAdmin(adminUsername)
    if (!isUserAdmin) {
        badRequest(res, "Only admins can access this endpoint!")
        return
    }

    try {
        const successDb = await db.exec('call DELETE_USER(?,?,?)', [adminUsername, usernameOfUserToDelete, reportRowPrimaryKey])
        const procedureSucceeded = toDTO.wasSuccessful(successDb)

        if (!procedureSucceeded) {
            badRequest(res, "User has never been reported!")
            return
        }

        success(res)
    } catch (e) {
        internalError(res, e.toString())
    }

}

module.exports = { getUncheckedReports, resolveReport, deleteUser }