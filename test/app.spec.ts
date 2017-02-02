const http = require('http')
const assert = require('assert')
const chaiHttp = require('chai-http')
const querystring = require('query-string')

const server = require('../src/app')
const serverPort = process.env.SERVER_PORT

import { deleteIdentity } from '../src/modules/identity/model/identity'

import clearDatabase from './dbGc'

after(function (done) {
    clearDatabase((err: any) => {
        if(err){
            return done(err)
        }

        done()
    })
});

describe('/', () => {
    const chai = require('chai')
    const should = chai.should()
    chai.use(chaiHttp)

    it('should return 200 on health check', (done) => {
        chai.request(`http://localhost:${serverPort}`)
            .get('/')
            .end((err, res) => {
                if (err) {
                    return done(err)
                }

                res.should.have.status(200)
                done()
            })
    })
})

describe('/identity', () => {
    const chai = require('chai')
    const should = chai.should()
    chai.use(chaiHttp)

    it('should return 400 on POST empty identity', (done) => {
        chai.request(`http://localhost:${serverPort}`)
            .post('/identity')
            .send({})
            .end((err, res) => {
                if (err) {
                    res.should.have.status(400)
                    return done()
                }

                done()
            })
    })

    it('should return 200 on POST identity', (done) => {
        const mockSendData = {
            email: `testUser+${Math.floor((Math.random() * 100) + 1)}@test.com`,
            password: '12345678'
        }

        chai.request(`http://localhost:${serverPort}`)
            .post('/identity')
            .send(mockSendData)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }

                describe('nested create identity', () => {
                    it('should not create new identity', (redoDone) => {
                        chai.request(`http://localhost:${serverPort}`)
                            .post('/identity')
                            .send(mockSendData)
                            .end((err, res) => {
                                if (err) {
                                    res.should.have.status(400)
                                }

                                redoDone()
                            })
                    })

                    it('should delete identity', (deleteDone) => {
                        const identityId = res.body.payload._id.toString()

                        deleteIdentity(identityId).then((deleteResult) => {
                            chai.expect(deleteResult.toString()).to.equal(identityId)

                            deleteDone()
                        }, deleteDone)
                    })
                })

                res.should.have.status(200)
                done()
            })
    })
})

describe('/auth/login', () => {
    const chai = require('chai')
    const should = chai.should()
    chai.use(chaiHttp)

    it('should 200 on login', (done) => {
        chai.request(`http://localhost:${serverPort}`)
            .post('/auth/login')
            .send({})
            .end((err, res) => {
                res.should.have.status(400)

                done()
            })
    })
})
