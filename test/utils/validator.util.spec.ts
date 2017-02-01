const chai = require('chai')

const should = chai.should()

import { emailValidator } from '../../src/utils/validator.util'

describe('validator util', () => {
    it('should return valid email', (done) => {
        const requestData = 'vasile@test.com'

        chai.expect(emailValidator(requestData)).to.equal(true)

        done()
    })
})
