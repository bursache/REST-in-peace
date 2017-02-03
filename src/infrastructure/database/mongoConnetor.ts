import * as mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient
const mongoURL = process.env.DB_URL

const initializeDatabase = () => (
    new Promise((resolve: Function, reject: Function) => {
        MongoClient.connect(mongoURL, (err: Error, db: mongodb.Db) => {
            if (err) {
                (<IGlobal>global).loggerUtil().error('Error on DB connection', err)
                reject()
            }

            (<IGlobal>global).loggerUtil().info(`Connected to DB at ${mongoURL}`)
            resolve(db)
        })
    })
)

export default initializeDatabase
