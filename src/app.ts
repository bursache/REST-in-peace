import * as steed from 'steed'

import initializeHTTPServer from './infrastructure/httpServer'
import initializeDatabase from './infrastructure/database/mongoConnetor'

import errorUtil from './utils/error.utils'
import loggerUtil from './utils/logger.utils'

const initializeGlobalUtils = (callback: Function) => {
    const restGlobal = (<IGlobal>global)

    restGlobal.errorUtil = errorUtil
    restGlobal.loggerUtil = loggerUtil

    callback()
}

const connectToDatabase = async (callback: Function) => {
    try {
        await initializeDatabase()

        callback()
    } catch (err) {
        callback(err)
    }
}

const initializeServer = async (callback: Function) => {
    try {
        await initializeHTTPServer()

        callback()
    } catch (err) {
        callback()
    }
}

steed.waterfall([
    initializeGlobalUtils,
    connectToDatabase,
    initializeServer
], (err: Error) => {
    if (err) {
        (<IGlobal>global).loggerUtil().Error(err)
    }
})
