const result = require('dotenv').config()
if (result.error) {
    throw result.error
}

const express = require('express');
const app = express();
const http = require('http');

const port = process.env.PORT || 5066;

app.set('host', process.env.IP || '0.0.0.0');
app.set('port', process.env.PORT || port);

//app.set('views', path.join(__dirname, 'views'));
//app.use(require('serve-static')(__dirname + '/../../public'));

app.use(require('cookie-parser')());
app.use(require('body-parser').json())//.urlencoded({ extended: true }));

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
var cors = require('cors')


app.use(express.static(__dirname + '/public'));
const getLoggerForStatusCode = (statusCode) => {
    if (statusCode >= 500) {
        return console.error.bind(console)
    }
    if (statusCode >= 400) {
        return console.warn.bind(console)
    }

    return console.log.bind(console)
}

const logRequestStart = (req, res, next) => {
    console.info(`${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`)

    const cleanup = () => {
        res.removeListener('finish', logFn)
        res.removeListener('close', abortFn)
        res.removeListener('error', errorFn)
    }

    const logFn = () => {
        cleanup()
        const logger = getLoggerForStatusCode(res.statusCode)
        logger(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`)
        logger(``)
    }

    const abortFn = () => {
        cleanup()
        console.warn('Request aborted by the client')
    }

    const errorFn = err => {
        cleanup()
        console.error(`Request pipeline error: ${err}`)
    }

    res.on('finish', logFn) // successful pipeline (regardless of its response)
    res.on('close', abortFn) // aborted pipeline
    res.on('error', errorFn) // pipeline internal error

    next()
}

app.use(logRequestStart)

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5066"],
    credentials: true
}));

app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

app.use(require('./api/loginPage/routes'))
app.use(require('./api/adminPage/routes'))
app.use(require('./api/homePage/routes'))
app.use(require('./api/settingsPage/routes'))
app.use(require('./middlewares/errorHandler/index.js'))

const server = http.createServer(app)


server.listen(port)

