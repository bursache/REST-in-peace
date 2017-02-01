import { expect } from 'chai'

import { createIdentity, deleteIdentity } from '../../../../src/modules/identity/model/identity'

describe('identity model', () => {
    it('should create identity', (done) => {
        const mockUser = {
            email: `testUser+${Math.floor((Math.random() * 100) + 1)}@test.com`,
            password: '12345678'
        }

        createIdentity(mockUser).then((result) => {

            describe('identity model nested delete', () => {
                it('should delete identity', (delteDone) => {
                    const userId = result._id

                    deleteIdentity(userId).then((deleteResult) => {
                        expect(deleteResult).to.equal(userId)

                        delteDone()
                    }, delteDone)
                })
            })

            done()
        }, done)

    })
})
