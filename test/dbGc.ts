import * as mongoose from "mongoose"

const clearDatabase = (callback: Function) => {
    const clearDB = () => {
        mongoose.connection.db.dropDatabase((err: any) => {
            if (err) {
                return callback(err)
            }

            return callback()
        })
    }

    if (mongoose.connection.readyState === 0) {
        mongoose.connect(process.env.DB_URL, function (err) {
            if (err) {
                throw err
            }

            return clearDB()
        });
    } else {
        return clearDB()
    }
}

export default clearDatabase