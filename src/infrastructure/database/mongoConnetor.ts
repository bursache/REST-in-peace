import * as mongoose from 'mongoose'
import * as bluebird from 'bluebird'

const mongoURL = 'mongodb://localhost:27017/rest-in-peace'

const initializeDatabase = () => {
    (<any>mongoose).Promise = bluebird

    return new Promise((resolve: Function, reject: Function) => {
        const connection = mongoose.createConnection(mongoURL)

        connection.on('open', () => {
            mongoose.connect(mongoURL);
            (<IGlobal>global).loggerUtil().info(`Connected to DB at ${mongoURL}`)

            resolve()
        })

        connection.on('error', (err: Error) => {
            (<IGlobal>global).loggerUtil().error('Error on DB connection', err)

            reject()
        })
    })
}

export default initializeDatabase
