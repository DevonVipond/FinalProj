const jwt = require('jsonwebtoken')

const verify = async(req, res, next) => {
    try {
        const accessToken = req.cookies['access-token']

        if (!accessToken) { throw new Error('No access token!') }

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        const id = decodedToken.id

        if (!id) { throw new Error('No user!') }

        req.userId = id

        next()

    } catch(err) {
        console.log(err)
        res.status(401).send('Invalid credentials')
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
    res.cookie('access-token', accessToken, {httpOnly: true, sameSite: 'lax', maxAge: process.env.ACCESS_TOKEN_LIFE})
    res.cookie('refresh-token', refreshToken, {httpOnly: true, maxAge: process.env.REFRESH_TOKEN_LIFE})
}

const setLogoutCookies = (res) => {
    const accessToken = jwt.sign({id: 'logout'}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 0})
    const refreshToken = jwt.sign({id: 'logout'}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: 0})
    res.cookie('access-token', accessToken, {httpOnly: true, sameSite: 'lax', maxAge: 0})
    res.cookie('refresh-token', refreshToken, {httpOnly: true, maxAge: 0})
}

module.exports = {verify, setLoginCookies, setLogoutCookies}


