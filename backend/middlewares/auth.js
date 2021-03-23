const jwt = require('jsonwebtoken')
const { unauthorized } = require('../api/responseHandler')

const verify = async(req, res, next) => {
    // TODO: REMOVE
    req.username = 'adolf'
    next()
    return

    try {
        const accessToken = req.cookies['refresh-token']

        if (!accessToken) { throw new Error('No access token!') }

        const decodedToken = jwt.verify(accessToken, process.env.REFRESH_TOKEN_SECRET)

        const id = decodedToken.id

        if (!id) { throw new Error('No user!') }

        req.username = id

        next()

    } catch(err) {

        console.log(err)
        
        unauthorized(res, 'Unable to create access/refresh tokens!')
    }
}

//const refresh = (req, res) => {
//    try {
//        let accessToken = req.cookies['access-token']
//
//        if (!accessToken) {throw new Error('No access token!')}
//
//        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
//
//    }
//}



const setLoginCookies = (res, accessToken, refreshToken) => {
    res.cookie('access-token', accessToken, {httpOnly: false, maxAge: process.env.ACCESS_TOKEN_LIFE | 99000})
    res.cookie('refresh-token', refreshToken, {httpOnly: false, maxAge: process.env.REFRESH_TOKEN_LIFE | 99000})
}

const setLogoutCookies = (res) => {
    const accessToken = jwt.sign({id: 'logout'}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 0})
    const refreshToken = jwt.sign({id: 'logout'}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: 0})
    res.cookie('access-token', accessToken, {httpOnly: true, sameSite: 'lax', maxAge: 0})
    res.cookie('refresh-token', refreshToken, {httpOnly: true, maxAge: 0})
}

module.exports = {verify, setLoginCookies, setLogoutCookies}


