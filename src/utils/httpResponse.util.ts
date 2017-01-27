const httpResponse = (response: IHandlerResponse) => {
    return {
        status: {
            errorName: response.err ? response.err.errorName : '',
            errorMessage: response.err ? response.err.errorMessage : '',
            success: response.err ? false : true,
        },
        payload: response.err ? {} : response.payload
    }
}

export default httpResponse
