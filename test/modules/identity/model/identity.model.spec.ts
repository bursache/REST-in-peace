import { expect } from 'chai'

import { createIdentity, findIdentityByEmail, deleteIdentity } from '../../../../src/modules/identity/model/identity'

describe('identity model', () => {
    it('should create identity', (done) => {
        const mockIdentity = {
            email: `testUser+${Math.floor((Math.random() * 100) + 1)}@test.com`,
            password: '12345678'
        }

        createIdentity(mockIdentity).then((result:any) => {
            describe('identity model nested', () => {
                it('should find identity by email', (findDone) => {
                    const email = result.email

                    findIdentityByEmail(email).then((findResult) => {
                        expect(findResult).to.be.an('object')
                        expect((<any>findResult)._id.toString()).to.equal(result._id.toString())

                        findDone()
                    }, findDone)
                })

                it('should not find identity by email', (findDone) => {
                    const email = 'notTraceableEmail@entity.com'

                    findIdentityByEmail(email).then((findResult) => {
                        findDone()
                    }, (err) => {
                        expect(err).to.be.an('object')
                        expect(err).to.have.property('errorMessage').and.to.equal('Resource not found')

                        findDone()
                    })
                })

                it('should delete identity', (deleteDone) => {
                    const identityId = result._id

                    deleteIdentity(identityId).then((deleteResult) => {
                        expect(deleteResult).to.equal(identityId)

                        deleteDone()
                    }, deleteDone)
                })
            })

            done()
        }, done)
    })
})
