const jwt = require('jsonwebtoken')

function createTokens (username) {
    try {
        const accessToken = jwt.sign({id: username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_LIFE})
        const refreshToken = jwt.sign({id: username}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_LIFE})

        return {accessToken, refreshToken}
    } catch (err) {
        console.log(err)
        throw err
    }
}

function convertGPSToCity(longitude, latitude) {

    // TODO
    return "CALGARY"
}

function makeUserFromDb(rows) {

    const { username, password } = rows[0]

    return { username, password }
}
module.exports = {createTokens, convertGPSToCity, makeUserFromDb}