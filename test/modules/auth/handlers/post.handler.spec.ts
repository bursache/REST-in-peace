import { expect } from 'chai'

import { decodeData } from '../../../../src/modules/auth/handlers/post.handler'

describe('post auth handler', () => {
    it('should decode data', (done) => {
        const requestData = {
            up: 'dmFzaWxlQGlvbi5jb206cGFyb2xhMTIz'
        }
        const decodedData = decodeData(requestData.up)

        expect(decodedData).to.be.an('object')
        expect(decodedData).to.have.property('email')
        expect(decodedData).to.have.property('password')

        done()
    })
})
