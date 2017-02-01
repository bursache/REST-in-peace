import {expect} from 'chai'

import { emailValidator } from '../../src/utils/validator.util'

describe('validator util', () => {
    it('should return valid email', (done) => {
        const requestData = 'vasile@test.com'

        expect(emailValidator(requestData)).to.equal(true)

        done()
    })
})
