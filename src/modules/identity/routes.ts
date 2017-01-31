import { Router } from 'express'
import { Request, Response } from 'express-serve-static-core'

import {putHandler} from './handlers/put.handler'

const routes = Router()

routes.get('/', (req: Request, res: Response) =>
    (res.status(200).send((<IGlobal>global).httpResponseUtil({ payload: { 'status': 'up' } })))
)

routes.put('/user',  (req: Request, res: Response) => putHandler(req, res))

export default routes
