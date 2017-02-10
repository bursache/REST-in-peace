import * as expressSession from 'express-session'
import * as connectMongo from 'connect-mongo'

const sessionManager = (server: any) => {
    (<any>expressSession).Session.prototype.login = (identity: any, request: any, callback: Function) => {
        request.session.regenerate((err: any) => {
            if (err) {
                return callback(err)
            }
        })

        request.session.identity = identity

        return callback()
    }

    const mongoStore = connectMongo(expressSession)
    const sessionSettings = {
        secret: 'mega-secret-secret-key',
        store: new mongoStore({
            url: process.env.DB_URL,
            ttl: (1 * 60 * 60)
        }),
        name: 'sid',
        resave: false,
        saveUninitialized: true,
        cookie: {
            path: '/',
            maxAge: 1 * 60 * 60 * 1000,
            httpOnly: false,
            secure: false
        }
    }

    server.use(expressSession(sessionSettings))
}

export {sessionManager}
