const db = require("../../db/index")
const { badRequest, internalError, success } = require("../responseHandler")
const makeReportsFromDb = require('./helpers')

// Returns all reported users where ReportedUsers.adminId == null
const getUncheckedReports = async (req, res) => {

    try {
        const reportsDb = await db.call('call GET_UNCHECKED_REPORTS()', [])// returns {primaryKey, reportedUsername, timesReported, reporterComments }
        let reports = db.findResults(reportsDb)

        if (!reports) {
            console.log('adminPageController -> getUncheckedReports -> no unchecked reports at this time!')
            success(res, {})
            return
        }

        //export type ReportedUser = {
        //    username: string,
        //    reporterComments: string
        //    timesReported: string,
        //    primaryKey: string
        //}

        let response = reports.map(r => {
            return {
                //username: string,
                //reporterComments: string
                //timesReported: string,
                //primaryKey: r.reportedID

            }
        })

        success(res, response)

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

        const success = await db.call('RESOLVE REPORT', [adminUsername, reportRowPrimaryKey, adminComments])
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
        const success = await db.call('DELETE USER', [adminUsername, usernameOfUserToDelete, reportRowPrimaryKey])

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