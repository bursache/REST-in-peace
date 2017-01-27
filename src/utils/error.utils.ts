const errors = require('./errors.json')

const errorUtil = (errorName: string = 'BadRequest'): IError => (errors[errorName])

export default errorUtil
