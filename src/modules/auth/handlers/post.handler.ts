import { Request, Response } from 'express-serve-static-core'
import * as steed from 'steed'
import { emailAndPasswordValidator } from '../../../utils/validator.util'
import { loginWorkflow } from '../workflows/login.workflow'

export const decodeData = (data: string): ILoginData => {
    const debuffedData = Buffer.from(data, 'base64').toString()
    const loginData = debuffedData.split(':')

    return {
        email: loginData[0],
        password: loginData[1]
    }
}

const login = (req: Request, res: Response) => {
    const requestData = req.body

    const decodeRequestData = (callback: Function) => {
        if (!requestData.up) {
            return callback({ err: (<IGlobal>global).errorUtil('MissingData') })
        }

        callback(null, decodeData(requestData.up))
    }

    const validateData = (loginData: ILoginData, callback: Function) => {
        if (!emailAndPasswordValidator(loginData)) {
            return callback({ err: (<IGlobal>global).errorUtil('MissingData') })
        }

        callback(null, loginData)
    }

    const loginIdentity = async (loginData: ILoginData, callback: Function) => {
        try {
            const loginInfo = await loginWorkflow(loginData, req)

            callback(null, loginInfo)
        } catch (err) {
            callback(err)
        }
    }

    steed.waterfall([
        decodeRequestData,
        validateData,
        loginIdentity
    ], (err: Error, result: any) => {
        if (err) {
            return res.status(400).send((<IGlobal>global).httpResponseUtil(err))
        }

        return res.status(200).send((<IGlobal>global).httpResponseUtil({ payload: result }))
    })
}

const logout = (req: any, res: Response) => {
    if (req.session) {
        req.session.destroy()
    }

    return res.status(200).send((<IGlobal>global).httpResponseUtil({ payload: {} }))
}

export { login, logout }
