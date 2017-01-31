import { Request } from 'express-serve-static-core'

import * as steed from 'steed'
import * as bcrypt from 'bcrypt'

export const encodePassword = (password: string): string => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    return hash
}

export const createIdentity = (req: Request) => {
    new Promise((resolve: <T>() => void, reject: Function) => {
        steed.waterfall([
            encodePassword
        ], resolve)
    })
}
