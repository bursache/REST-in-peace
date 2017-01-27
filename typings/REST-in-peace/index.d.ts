interface IGlobal extends NodeJS.Global {
    errorUtil: Function
    loggerUtil: Function
    httpResponseUtil: Function
}

interface IError {
    errorMessage: string
}

interface IHandlerResponse {
    err?: {
        errorName: string
        errorMessage: string
    },
    payload?: any
}