const db = require(".././../db/index")
const { success, internalError, badRequest } = require("../responseHandler")
const { setLoginCookies, setLogoutCookies} = require('../../middlewares/auth')
const { createTokens, convertGPSToCity } = require('./helpers')

const userLogin = async (req, res) => {

    const { username, password, longitude, latitude } = req.body

    if (!username || !password || !longitude || !latitude) {
        badRequest(res)
        return 
    }

    try {

        const city = convertGPSToCity(longitude, latitude)

        const loginSuccessful = await db.call('VERIFY USER LOGIN CREDENTIALS', username, password)
        if (!loginSuccessful) {

            badRequest(res, "Authentication failed!")
            return
            
        }

        const success = await db.call('ADD USERS LOCATION', longitude, latitude, city) // ENSURE THERE ARE NO MORE THAN 10 ENTRIES!!!

        if (!success) {

            throw Error('Unable to add users location to database')

        }

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

        const city = convertGPSToCity(longitude, latitude)

        const loginSuccessful = await db.call('VERIFY ADMIN LOGIN CREDENTIALS', username, password) 
        if (!loginSuccessful) {

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


        const is_successful = await db.call('REGISTER', [username, password, gender, firstName, lastName, phoneNumber, age, about, accountType] ) 

        if (!is_successful) {
            badRequest(res, 'Failed to register user!')
            return
        }

        const city = convertGPSToCity(longitude, latitude)

        await db.call('ADD USERS LOCATION', longitude, latitude, city) // ENSURE THERE ARE NO MORE THAN 10 ENTRIES!!!

        success(res)

    } catch (e) {

        internalError(res, e.toString())

    }

}

module.exports = { userLogin, logout, adminLogin, register }