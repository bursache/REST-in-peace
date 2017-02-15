import { Router } from 'express'
import { Request, Response } from 'express-serve-static-core'

import { postHandler } from './handlers/post.handler'
import * as getHandler from './handlers/get.handler'

const routes = Router()

routes.get('/', (req: Request, res: Response) =>
    (res.status(200).send((<IGlobal>global).httpResponseUtil({ payload: { 'status': 'up' } })))
)

routes.post('/identity',  (req: Request, res: Response) => postHandler(req, res))

routes.get('/identity', (req: Request, res: Response) => getHandler.getIdentity(req, res))

routes.get('/identities', (req: Request, res: Response) => getHandler.getIdentities(req, res))

export default routes
