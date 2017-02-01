const httpResponse = (response: IHTTPResponse) => ({
    status: {
        errorMessage: response.err ? response.err.errorMessage : '',
        success: response.err ? false : true,
    },
    payload: response.err ? {} : response.payload
})

export default httpResponse
