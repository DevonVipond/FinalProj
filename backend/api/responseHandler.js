
const success = (res, body = {}) => {
    res.status(200).json(body)
}

const internalError = (res, errMessage = undefined) => {
    res.status(500).json(errMessage)
}

const badRequest = (res, errMessage = undefined) => {
    res.status(400).json(errMessage)
}

const unauthorized = (res, errMessage = undefined) => {
    res.status(500).json(errMessage)
}

module.exports = { success, internalError, badRequest, unauthorized }
