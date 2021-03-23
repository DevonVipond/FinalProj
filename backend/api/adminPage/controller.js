const db = require("../../db/index")
const { badRequest, internalError, success } = require("../responseHandler")
const toDTO = require('../toDTO')

// Returns all reported users where ReportedUsers.adminId == null
const getUncheckedReports = async (req, res) => {

    try {
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

    try {

        const successDb = await db.procedure('RESOLVE REPORT', [adminUsername, reportRowPrimaryKey, adminComments])
        const success = toDTO.wasSuccessful(successDb)

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
        const successDb = await db.procedure('DELETE USER', [adminUsername, usernameOfUserToDelete, reportRowPrimaryKey])
        const success = toDTO.wasSuccessful(successDb)

        if (!success) {
            badRequest(res, "User has never been reported!")
            return
        }

        success(res)
    } catch (e) {
        internalError(res, e.toString())
    }

}

module.exports = { getUncheckedReports, resolveReport, deleteUser }