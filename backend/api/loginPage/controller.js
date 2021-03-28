const db = require(".././../db/index")
const { success, internalError, badRequest } = require("../responseHandler")
const { setLoginCookies, setLogoutCookies} = require('../../middlewares/auth')
const { createTokens } = require('./helpers')
const toDTO = require('../toDTO')

const userLogin = async (req, res) => {

    const { username, password, longitude, latitude } = req.body

    if (!username || !password || !longitude || !latitude) {
        badRequest(res, `Missing parameters! \n ${username}, ${password}, ${longitude}, ${latitude}`)
        return 
    }

    try {

        const authResultDb = await db.exec('call authenticateUser(?,?, @res); select @res;', [username, password])

        if (!toDTO.wasSuccessful(authResultDb.data)) {
            badRequest(res, "Authentication failed!")
            return
        }

        const resultDb = await db.exec('call addUserLocations(?,?,?)', [username, latitude, longitude]) // ENSURE THERE ARE NO MORE THAN 10 ENTRIES!!!

        if (resultDb.affectedRows <= 0) { throw Error('Unable to add users location to database') }

        const { accessToken, refreshToken } = createTokens(username)
        setLoginCookies(res, accessToken, refreshToken)
        success(res)

    } catch (e) {

        internalError(res, e.toString())

    }

}

const logout = async (req, res) => {
    setLogoutCookies(res)
    success(res)
}

const adminLogin = async (req, res) => {

    const { username, password } = req.body

    if (!username || !password) {
        badRequest(res, `bad body: ${username}, ${password}`)
        return 
    }

    try {

        const resultDb = await db.exec('call authenticateAdmin(?,?, @res); select @res;', [username, password])

        if (!toDTO.wasSuccessful(resultDb.data)) {
            badRequest(res, "Authentication failed!")
            return
        }

        const { accessToken, refreshToken } = createTokens(username)
        setLoginCookies(res, accessToken, refreshToken)
        success(res)

    } catch (e) {

        internalError(res, e.toString())

    }


}

const register = async (req, res) => {

    try {

        const { username, password, gender, firstName, lastName,
                phoneNumber, age, about, accountType, longitude, latitude} = req.body

        if ( !username || !password || !gender || !firstName || !lastName||
             !phoneNumber || !age || !about || !accountType || !longitude || !latitude ) {
            badRequest(res, "Missing parameters!")
            return
        }


        let createUserResultDb = await db.exec('call createUser(?,?,?,?,?,?,?,?,?)', [username, password, accountType, gender, firstName, lastName, phoneNumber, age, about] )
        //if (!toDTO.wasSuccessful(createUserResultDb.data)) {
        //    badRequest(res, "Failed to register user!")
        //    return
        //}

        const resultDb = await db.exec('call addUserLocations(?,?,?)', [username, latitude, longitude]) // ENSURE THERE ARE NO MORE THAN 10 ENTRIES!!!
        if (resultDb.affectedRows <= 0) {
            badRequest(res, "Failed to add users location!")
            return
        }

        const { accessToken, refreshToken } = createTokens(username)
        setLoginCookies(res, accessToken, refreshToken)
        success(res)

    } catch (e) {

        internalError(res, e.toString())

    }

}

const getAccountType = async (req, res) => {

    try {

        const username = req.username

        const accountTypeDb  = await db.exec('call getUserType(?)', [username] )
        const accountType = toDTO.accountType(accountTypeDb.data)

        success(res, {accountType})

    } catch (e) {

        internalError(res, e.toString())

    }


}

module.exports = { userLogin, logout, adminLogin, register, getAccountType }