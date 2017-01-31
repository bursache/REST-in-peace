import * as steed from 'steed'
import * as bcrypt from 'bcrypt'

import { createIdentity } from '../model/identity'

const salt = bcrypt.genSaltSync(10)
export const encodePassword = (password: string): string => bcrypt.hashSync(password, salt)

export const createIdentityWorklow = (userData: IIdentity) => {
    return new Promise((resolve: Function, reject: Function) => {
        let sendUserData: IIdentity

        const mapData = (callback: Function) => {
            sendUserData = Object.assign({}, userData)
            sendUserData.password = encodePassword(userData.password)

            callback()
        }

        const createIdentityHandler = async (callback: Function) => {
            try {
                const user = await createIdentity(sendUserData)

                callback(null, user)
            } catch (err) {
                callback(err)
            }
        }

        steed.waterfall([
            mapData,
            createIdentityHandler
        ], (err: Error, result: any) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}
