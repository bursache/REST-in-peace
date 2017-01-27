import * as express from 'express'

const serverPort = 5050
const server = express()

const initializeHTTPServer = () => {
    return new Promise((resolve: Function, reject: Function) => {
        server.listen(serverPort, () => {
            (<IGlobal>global).loggerUtil().info(`Server is running on port ${serverPort}`)

            resolve()
        })
    })
}

export default initializeHTTPServer
