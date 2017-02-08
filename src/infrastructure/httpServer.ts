import { Request } from 'express-serve-static-core'

import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as connectMongo from 'connect-mongo'
import * as expressSession from 'express-session'

import * as httpServerMiddlewares from '../infrastructure/middlewares'
import identityRoutes from '../modules/identity/routes'
import authRoutes from '../modules/auth/routes'

const serverPort = process.env.SERVER_PORT || 5050
const server = express()
const mongoStore = connectMongo(expressSession)
const sessionSettings = {
    secret: 'mega-secret-secret-key',
    store: new mongoStore({
        url: process.env.DB_URL,
        ttl: (1 * 60 * 60)
    }),
    name: 'sid',
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        maxAge: 1 * 60 * 60 * 1000,
        httpOnly: false,
        secure: false
    }
};

(<any>expressSession).Session.prototype.login = (identity: any) => this.identityInfo = identity

const initializeHTTPServer = () => {
    server.set('trust proxy', 1)

    server.use(bodyParser.json({ limit: '50mb' }))
    server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

    server.use(httpServerMiddlewares.allowCrossDomain)
    server.use(httpServerMiddlewares.logRequest)
    server.use(identityRoutes)
    server.use(authRoutes)
    server.use(expressSession(sessionSettings))

    return new Promise((resolve: Function, reject: Function) => {
        server.listen(serverPort, () => {
            (<IGlobal>global).loggerUtil().info(`Server is running on port ${serverPort}`)

            resolve()
        })
    })
}

export default initializeHTTPServer
