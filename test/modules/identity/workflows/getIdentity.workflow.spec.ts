import { expect } from 'chai'
import * as bcrypt from 'bcrypt'

import { deleteIdentity } from '../../../../src/modules/identity/model/identity'
import * as identityCreation from '../../../../src/modules/identity/workflows/identityCreation.workflow'
import * as getIdentity from '../../../../src/modules/identity/workflows/getIdentity.workflow'

describe('getIdentity', () => {
    it('should encrypt password', (done) => {
        const mockPassword = 'test'
        const hash = identityCreation.encodePassword(mockPassword)

        bcrypt.compare(mockPassword, hash, function (err, res) {
            expect(res).to.equal(true)
            done()
        })
    })

    it('should create identity', (done) => {
        const mockIdentity = {
            email: `testUser+${Math.floor((Math.random() * 100) + 1)}@test.com`,
            password: '12345678'
        }

        identityCreation.createIdentityWorklow(mockIdentity).then((newIdentity: any) => {
            describe('nested create identity', () => {
                it('should be able to retrieve identity', (identityDone) => {
                    const mockRequest = {
                        session: {
                            identity: {
                                email: mockIdentity.email
                            }
                        }
                    }

                    getIdentity.getIdentityWorkflow(mockRequest).then((findResult) => {
                        identityDone()
                    }, (err) => {
                        expect(err).to.be.an('object')
                        expect(err.err).to.have.property('errorMessage')
                        identityDone()
                    })
                })

                it('should not be able to retrieve identity', (identityDone) => {
                    const mockRequest = {
                        session: {
                            identity: {
                                email: ''
                            }
                        }
                    }

                    getIdentity.getIdentityWorkflow(mockRequest).then((findResult) => {
                        identityDone()
                    }, (err) => {
                        expect(err).to.be.an('object')
                        expect(err.err).to.have.property('errorMessage')
                        identityDone()
                    })
                })

                it('should delete identity', (deleteDone) => {
                    const identityId = newIdentity._id

                    deleteIdentity(identityId).then((deleteResult) => {
                        expect(deleteResult).to.equal(identityId)

                        deleteDone()
                    }, deleteDone)
                })
            })

            expect(newIdentity).to.be.an('object')
            done()
        })
    })
})