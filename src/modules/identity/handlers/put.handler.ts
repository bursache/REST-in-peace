import { Request, Response } from 'express-serve-static-core'

import * as steed from 'steed'

import { createIdentityWorklow } from '../workflows/identityCreation.workflow'

import { emailValidator } from '../../../utils/validator.util'

export const validateRequestData = (data: any): boolean =>
    (data.email && data.password && emailValidator(data.email) && data.password.length > 6)

export const putHandler = (req: Request, res: Response) => {
    const requestData: IIdentity = req.body

    const validateData = (callback: Function) => {
        if (!validateRequestData(requestData)) {
            return callback((<IGlobal>global).errorUtil('MissingData'))
        }

        callback()
    }

    const createIdentity = async (callback: Function) => {
        try {
            const identity = await createIdentityWorklow(requestData)

            callback(null, identity)
        } catch (err) {
            callback(err)
        }
    }

    steed.waterfall([
        validateData,
        createIdentity
    ], (err: Error, result: any) => {
        if (err) {
            return res.status(400).send((<IGlobal>global).httpResponseUtil(err))
        }

        return res.status(200).send((<IGlobal>global).httpResponseUtil({ payload: result }))
    })
}
