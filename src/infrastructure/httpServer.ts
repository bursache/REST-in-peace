import * as express from 'express'
import * as pino from 'pino'
import * as util from 'util'

const serverPort = 5050
const pinoInstance = pino()
let server = express()

export function initializeHTTPServer() {
    server.listen(serverPort, () => pinoInstance.info(`Server is running on port ${serverPort}...`))
}
