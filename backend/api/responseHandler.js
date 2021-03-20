
const success = (res, body = {}) => {
    console.log('success -> ', body)
    res.status(200).json(body)
}

const internalError = (res, errMessage = undefined) => {
    console.log('internalError -> ', errMessage)
    res.status(500).json(errMessage)
}

const badRequest = (res, errMessage = undefined) => {
    console.log('badRequest -> ', errMessage)
    res.status(400).json(errMessage)
}

const unauthorized = (res, errMessage = undefined) => {
    console.log('unauthorized -> ', errMessage)
    res.status(401).json(errMessage)
}

module.exports = { success, internalError, badRequest, unauthorized }
