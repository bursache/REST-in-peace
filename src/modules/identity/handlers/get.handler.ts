import { Request, Response } from 'express-serve-static-core'

import * as steed from 'steed'

import { getIdentityWorkflow } from '../workflows/getIdentity.workflow'
import { getIdentitiesWorkflow } from '../workflows/getIdentities.workflow'

const getIdentity = (req: Request, res: Response) => {
    const getIdentityFromWorkflow = async (callback: Function) => {
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
        getIdentityFromWorkflow,
        mapResponse
    ], (err: Error, result: any) => {
        if (err) {
            return res.status(400).send((<IGlobal>global).httpResponseUtil(err))
        }

        return res.status(200).send((<IGlobal>global).httpResponseUtil({ payload: result }))
    })
}

const getIdentities = (req: Request, res: Response) => {
    const getIdentitiesFromWorkflow = async (callback: Function) => {
        try {
            await getIdentitiesWorkflow((identity: IIdentity) => {
                const response = {
                    identityId: identity['_id'].toString(),
                    profile: identity['profile'],
                    email: identity['email']
                }

                res.write(JSON.stringify(response))
            })

            callback()
        } catch (err) {
            callback(err)
        }
    }

    steed.waterfall([
        getIdentitiesFromWorkflow
    ], (err: Error) => {
        if (err) {
            return res.status(400).send((<IGlobal>global).httpResponseUtil(err))
        }

        return res.status(200).end()
    })
}

export { getIdentity, getIdentities }
