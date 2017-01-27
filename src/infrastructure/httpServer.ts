import * as express from 'express'

const serverPort = 5050
let server = express()

export function initializeHTTPServer() {
    server.listen(serverPort, () => (<IGlobal>global).loggerUtil().info(`Server is running on port ${serverPort}...`))
}
