import {expect} from 'chai'

import { emailValidator, emailAndPasswordValidator } from '../../src/utils/validator.util'

describe('validator util', () => {
    it('should return valid email', (done) => {
        const requestData = 'vasile@test.com'

        expect(emailValidator(requestData)).to.equal(true)

        done()
    })

    it('should return valid request data', (done) => {
        const requestData = {
            email: 'vasile@test.com',
            password: '12345678'
        }

        expect(emailAndPasswordValidator(requestData)).to.equal(true)

        done()
    })
})
