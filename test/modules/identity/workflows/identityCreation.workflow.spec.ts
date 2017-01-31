const chai = require('chai')
const bcrypt = require('bcrypt')

const should = chai.should()

import * as identityCreation from '../../../../src/modules/identity/workflows/identityCreation.workflow'

describe('identityCreation', () => {
    it('should encrypt password', (done) => {
        const mockPassword = 'test'
        const hash = identityCreation.encodePassword(mockPassword)

        bcrypt.compare(mockPassword, hash, function (err, res) {
            chai.expect(res).to.equal(true)
            done()
        })
    })
})
