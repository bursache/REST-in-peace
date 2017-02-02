import { Router } from 'express'
import { Request, Response } from 'express-serve-static-core'

import {postHandler} from './handlers/post.handler'

const routes = Router()

routes.post('/auth/login',  (req: Request, res: Response) => postHandler(req, res))

export default routes
