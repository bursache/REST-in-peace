import { Router } from 'express'
import { Request, Response } from 'express-serve-static-core'

const routes = Router()

routes.get('/', (req: Request, res: Response) =>
    (res.status(200).send((<IGlobal>global).httpResponseUtil({ payload: { 'status': 'up' } })))
)

routes.put('/user',  (req: Request, res: Response) => {
    // try {
        return res.status(200).send((<IGlobal>global).httpResponseUtil({ payload: { 'status': 'up' } }))
    // } catch (err) {
    //     return res.status(200).send((<IGlobal>global).httpResponseUtil({ payload: { 'status': 'up' } }))
    // }
})

export default routes
