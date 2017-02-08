interface IGlobal extends NodeJS.Global {
    errorUtil: Function
    loggerUtil: Function
    httpResponseUtil: Function,
    db: any
}

interface IError {
    errorMessage: string
}

interface IHTTPResponse {
    err?: IError
    payload?: any
}

interface IIdentity {
    profile?: {
        name:{
            first: string
            last: string
        }
    }
    email: string
    password: string
}

interface ILoginData {
    email: string
    password: string
}

interface Request extends Express.Request {
    session: any
}