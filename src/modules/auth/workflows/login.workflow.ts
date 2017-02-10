import * as steed from 'steed'

import { findIdentiyByEmail } from '../../identity/model/identity'
import { passwordValidator } from '../../../utils/validator.util'

export const loginWorkflow = (loginData: ILoginData, req: any) => (
    new Promise((resolve: Function, reject: Function) => {
        const checkIdentity = async (callback: Function) => {
            try {
                const identityData = await findIdentiyByEmail(loginData.email)

                callback(null, identityData)
            } catch (err) {
                callback(err)
            }
        }

        const checkIdentityPassword = async(identityData: any, callback: Function) => {
            try {
                const isValidPassword = await passwordValidator(loginData.password, identityData.password)

                if (isValidPassword) {
                    callback(null, identityData)
                } else {
                    callback({err: (<IGlobal>global).errorUtil('InvalidCredentials')})
                }
            } catch (err) {
                callback({err: (<IGlobal>global).errorUtil('InvalidCredentials')})
            }
        }

        const createSession = (identityData: any, callback: Function) => {
            req.session.login(identityData, req, (err: Error) => {
                if (err) {
                    return callback(err)
                }

                return callback()
            })
        }

        steed.waterfall([
            checkIdentity,
            checkIdentityPassword,
            createSession
        ], (err: Error) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
)
