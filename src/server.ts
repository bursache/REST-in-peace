import * as express from 'express'
import * as pino from 'pino'

const serverPort = 5050
const pinoInstance = pino()
let server = express()

server.listen(serverPort, () => pinoInstance.info(`Server is running on port ${serverPort}...`))
