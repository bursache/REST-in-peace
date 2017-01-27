import { Router } from 'express'
import { Request, Response } from 'express-serve-static-core'

const routes = Router()

routes.post('/', async (req: Request, res: Response) => {
    setTimeout(() =>
        (res.status(200).send((<IGlobal>global).httpResponseUtil({ payload: { 'key': 'value' } }))), 1000
    )
})

export default routes
