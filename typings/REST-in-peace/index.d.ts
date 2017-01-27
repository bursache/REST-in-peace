interface IGlobal extends NodeJS.Global {
    errorUtil: Function
    loggerUtil: Function
}

interface IError {
    errorMessage: string
}