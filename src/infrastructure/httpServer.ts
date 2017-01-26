import * as express from 'express'

import logger from '../utils/logger.utils'

const serverPort = 5050
let server = express()

export function initializeHTTPServer() {
    server.listen(serverPort, () => logger.info(`Server is running on port ${serverPort}...`))
}
