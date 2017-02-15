import { Router } from 'express'
import { Request, Response } from 'express-serve-static-core'

import * as postHandler from './handlers/post.handler'

const routes = Router()

routes.post('/auth/login',  (req: Request, res: Response) => postHandler.login(req, res))

routes.post('/auth/logout',  (req: Request, res: Response) => postHandler.logout(req, res))

export default routes
