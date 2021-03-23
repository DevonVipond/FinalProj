
const success = (res, body = null) => {
    if (body) {
        console.log('success -> ', JSON.stringify(body))
        res.status(200).json(body)
    } else {
        res.status(200).send('')
    }
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

function renameKeys(dataStructure, oldKeyName, newKeyName, toLower=false) {
    if (!dataStructure || !oldKeyName || !newKeyName) throw new Error('renameKeys -> missing args!')

    if (Array.isArray(dataStructure)) {
        dataStructure.forEach((value, index) => {
            dataStructure[index] = renameKeys(value, oldKeyName, newKeyName, toLower)
        })
    }

    if (dataStructure[oldKeyName]) {
        let transfer = dataStructure[oldKeyName]
        if (toLower) {
            transfer = transfer.toLowerCase()
        }
        dataStructure[newKeyName] = transfer
        delete dataStructure[oldKeyName]
    }

    return dataStructure
}


module.exports = { success, internalError, badRequest, unauthorized, renameKeys }
