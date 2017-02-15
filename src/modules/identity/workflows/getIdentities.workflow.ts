import { findIdentities } from '../model/identity'

export const getIdentitiesWorkflow = (callback: Function) => (
    new Promise(async (resolve: Function, reject: Function) => {
        try {
            await findIdentities(callback)

            resolve()

        } catch (err) {
            reject(err)
        }
    })
)
