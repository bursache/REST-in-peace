import * as steed from 'steed'
import * as bcrypt from 'bcrypt'

import { createIdentity, findIdentiyByEmail } from '../model/identity'

const salt = bcrypt.genSaltSync(10)
export const encodePassword = (password: string): string => bcrypt.hashSync(password, salt)

export const createIdentityWorklow = (identityData: IIdentity) => (
    new Promise((resolve: Function, reject: Function) => {
        let sendIdentityData: IIdentity

        const mapData = (callback: Function) => {
            sendIdentityData = Object.assign({}, identityData)
            sendIdentityData.password = encodePassword(identityData.password)

            callback()
        }

        const checkIdentity = async (callback: Function) => {
            try {
                const foundIdentity = await findIdentiyByEmail(sendIdentityData.email)

                if (foundIdentity) {
                    return callback({ err: (<IGlobal>global).errorUtil('BadRequest') })
                }

                callback()
            } catch (err) {
                if (err.errorMessage === 'Resource not found') {
                    return callback()
                }

                callback(err)
            }
        }

        const createIdentityHandler = async (callback: Function) => {
            try {
                const identity = await createIdentity(sendIdentityData)

                callback(null, identity)
            } catch (err) {
                callback({ err: err })
            }
        }

        steed.waterfall([
            mapData,
            checkIdentity,
            createIdentityHandler
        ], (err: Error, result: any) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
)
