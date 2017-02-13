import { findIdentiyByEmail } from '../model/identity'

export const getIdentityWorkflow = (req: any) => (
    new Promise((resolve: Function, reject: Function) => {
        const checkIdentity = async (callback: Function) => {
            try {
                const identityData = await findIdentiyByEmail(req.session.identity.email)

                callback(null, identityData)
            } catch (err) {
                callback({ err: err })
            }
        }

        checkIdentity((err: Error, identityData: IIdentity) => {
            if (err) {
                reject(err)
            } else {
                resolve(identityData)
            }
        })
    })
)
