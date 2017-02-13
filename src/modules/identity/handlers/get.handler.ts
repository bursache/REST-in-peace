import { Request, Response } from 'express-serve-static-core'

import * as steed from 'steed'

import { getIdentityWorkflow } from '../workflows/getIdentity.workflow'

export const getHandler = (req: Request, res: Response) => {
    const getIdentity = async (callback: Function) => {
        try {
            const identity = await getIdentityWorkflow(req)

            callback(null, identity)
        } catch (err) {
            callback(err)
        }
    }

    const mapResponse = (identity: IIdentity, callback: Function) => {
        const response = {
            identityId: identity['_id'].toString(),
            profile: identity['profile']
        }

        callback(null, response)
    }

    steed.waterfall([
        getIdentity,
        mapResponse
    ], (err: Error, result: any) => {
        if (err) {
            return res.status(400).send((<IGlobal>global).httpResponseUtil(err))
        }

        return res.status(200).send((<IGlobal>global).httpResponseUtil({ payload: result }))
    })
}
