import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as helmet from 'helmet'

import * as httpServerMiddlewares from '../infrastructure/middlewares'
import { sessionManager } from '../infrastructure/sessionManager'
import identityRoutes from '../modules/identity/routes'
import authRoutes from '../modules/auth/routes'

const serverPort = process.env.SERVER_PORT || 5050
const server = express()

const initializeHTTPServer = () => {
    server.set('trust proxy', 1)

    sessionManager(server)

    server.use(bodyParser.json({ limit: '50mb' }))
    server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

    server.use(httpServerMiddlewares.allowCrossDomain)
    server.use(httpServerMiddlewares.logRequest)
    server.use(httpServerMiddlewares.validateSession)
    server.use(helmet())
    server.use(identityRoutes)
    server.use(authRoutes)

    return new Promise((resolve: Function, reject: Function) => {
        server.listen(serverPort, () => {
            (<IGlobal>global).loggerUtil().info(`Server is running on port ${serverPort}`)

            resolve()
        })
    })
}

export default initializeHTTPServer
