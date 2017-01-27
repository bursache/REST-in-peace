import * as steed from 'steed'

import { initializeHTTPServer } from './infrastructure/httpServer'

import errorUtil from './utils/error.utils'
import loggerUtil from './utils/logger.utils'

const initGlobalUtils = (callback: Function) => {
    const restGlobal = (<IGlobal>global)

    restGlobal.errorUtil = errorUtil
    restGlobal.loggerUtil = loggerUtil

    callback()
}

const initServer = (callback: Function) => {
    initializeHTTPServer()

    callback()
}

steed.waterfall([
    initGlobalUtils,
    initServer
], (err: Error) => {
    if (err) {
        (<IGlobal>global).loggerUtil().Error(err)
    }
})
