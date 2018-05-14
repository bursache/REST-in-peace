import * as jwt from 'jsonwebtoken'

const httpResponse = (response: IHTTPResponse) => {
    return jwt.sign({
        status: {
            errorMessage: response.err ? response.err.errorMessage : '',
            success: !response.err,
        },
        payload: response.err ? {} : response.payload
    }, process.env.JWT_KEY)
}

export default httpResponse
