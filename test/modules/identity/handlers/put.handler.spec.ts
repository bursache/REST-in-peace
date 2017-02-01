const chai = require('chai')

const should = chai.should()

import { validateRequestData } from '../../../../src/modules/identity/handlers/put.handler'

describe('put handler', () => {
    it('should return valid request data', (done) => {
        const requestData = {
            email: 'vasile@test.com',
            password: '12345678'
        }

        chai.expect(validateRequestData(requestData)).to.equal(true)

        done()
    })
})