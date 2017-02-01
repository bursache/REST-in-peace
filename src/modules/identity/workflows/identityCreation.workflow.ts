import * as steed from 'steed'
import * as bcrypt from 'bcrypt'

import { createIdentity } from '../model/identity'

const salt = bcrypt.genSaltSync(10)
export const encodePassword = (password: string): string => bcrypt.hashSync(password, salt)

export const createIdentityWorklow = (identityData: IIdentity) => {
    return new Promise((resolve: Function, reject: Function) => {
        let sendIdentityData: IIdentity

        const mapData = (callback: Function) => {
            sendIdentityData = Object.assign({}, identityData)
            sendIdentityData.password = encodePassword(identityData.password)

            callback()
        }

        const createIdentityHandler = async (callback: Function) => {
            try {
                const identity = await createIdentity(sendIdentityData)

                callback(null, identity)
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
