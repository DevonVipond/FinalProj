const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500).send({error: { message: error.message }})

    console.warn(`An error occured for {$req.path} \n` + error.toString())
}

module.exports = errorHandler