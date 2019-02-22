const http = require('http')
const assert = require('assert')
const chaiHttp = require('chai-http')
const querystring = require('query-string')

const server = require('../src/app')
const serverPort = process.env.SERVER_PORT

import { deleteIdentity } from '../src/modules/identity/model/identity'

import clearDatabase from './dbGc'

after((done: any) => {
    clearDatabase((err: any) => {
        if (err) {
            return done(err)
        }

        done()
    })
})

describe('/', () => {
    const chai = require('chai')
    const should = chai.should()
    chai.use(chaiHttp)

    it('should return 200 on health check', (done: any) => {
        chai.request(`http://localhost:${serverPort}`)
            .get('/')
            .end((err: any, res: any) => {
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
    const mockSendData = {
        email: `testUser+${Math.floor((Math.random() * 100) + 1)}@test.com`,
        password: '12345678'
    }
    chai.use(chaiHttp)

    it('should return 400 on POST empty identity', (done: any) => {
        chai.request(`http://localhost:${serverPort}`)
            .post('/identity')
            .send({})
            .end((err: any, res: any) => {
                if (err) {
                    res.should.have.status(400)
                    return done()
                }

                done()
            })
    })

    it('should return 200 on POST identity', (done: any) => {
        chai.request(`http://localhost:${serverPort}`)
            .post('/identity')
            .send(mockSendData)
            .end((err: any, res: any) => {
                if (err) {
                    return done(err)
                }

                describe('nested create identity', () => {
                    it('should not create new identity', (redoDone: any) => {
                        chai.request(`http://localhost:${serverPort}`)
                            .post('/identity')
                            .send(mockSendData)
                            .end((error: any, response: any) => {
                                if (error) {
                                    response.should.have.status(400)
                                }

                                redoDone()
                            })
                    })
                })

                res.should.have.status(200)
                done()
            })
    })

    it('should return and failed validation', (done: any) => {
        const mockSendDataFailing = {
            email: `testUser+MONGOERROR${Math.floor((Math.random() * 100) + 1)}@test.com`,
            password: '12345678',
            profile: {
                name: {
                    first: 'ion',
                    last: 123
                }
            }
        }

        chai.request(`http://localhost:${serverPort}`)
            .post('/identity')
            .send(mockSendDataFailing)
            .end((err: any, res: any) => {
                if (err) {
                    res.should.have.status(400)
                }

                chai.expect(res).to.have.property('text').and.to.not.equal('')
                // chai.expect(res.body.status).to.have.property('errorMessage').and.to.equal('Document failed validation')
                done()
            })
    })

    it('should return 400 on GET identity', (done: any) => {
        chai.request(`http://localhost:${serverPort}`)
            .get('/identity')
            .end((err: any, res: any) => {
                if (err) {
                    res.should.have.status(400)
                }

                chai.expect(res).to.have.property('text').and.to.not.equal('')
                done()
            })
    })

    it('should return 200 on GET identity', (done: any) => {
        const mockLoginDataa = {
            up: new Buffer(mockSendData.email + ':' + mockSendData.password).toString('base64')
        }
        const agent = chai.request.agent(`http://localhost:${serverPort}`)

        agent
            .post('/auth/login')
            .send(mockLoginDataa)
            .end((err: any, res: any) => {
                if (err) {
                    return done(err)
                }

                res.should.have.status(200)
                chai.expect(res).to.have.cookie('sid')

                agent
                    .get('/identity')
                    .end((error: any, result: any) => {
                        if (error) {
                            result.should.have.status(400)

                            return done()
                        }

                        result.should.have.status(200)
                        chai.expect(result).to.have.property('text').and.to.not.equal('')
                        done()
                    })
            })
    })
})

describe('/auth/login', () => {
    const chai = require('chai')
    const should = chai.should()
    chai.use(chaiHttp)

    const mockSendData = {
        email: `testUser+${Math.floor((Math.random() * 100) + 1)}@test.com`,
        password: '12345678'
    }

    it('should return 200 on POST identity', (done: any) => {
        chai.request(`http://localhost:${serverPort}`)
            .post('/identity')
            .send(mockSendData)
            .end((err: any) => {
                if (err) {
                    return done(err)
                }

                done()
            })
    })

    it('should return 200 on POST auth/login', (done: any) => {
        const mockLoginData = {
            up: new Buffer(mockSendData.email + ':' + mockSendData.password).toString('base64')
        }

        chai.request(`http://localhost:${serverPort}`)
            .post('/auth/login')
            .send(mockLoginData)
            .end((err: any, res: any) => {
                if (err) {
                    return done(err)
                }

                res.should.have.status(200)

                done()
            })
    })

    it('should return 400 on auth/login when no data is send', (done: any) => {
        const mockLoginData = {
            up: new Buffer(':').toString('base64')
        }

        chai.request(`http://localhost:${serverPort}`)
            .post('/auth/login')
            .send(mockLoginData)
            .end((err: any, res: any) => {
                if (err) {
                    res.should.have.status(400)
                }

                chai.expect(res).to.have.property('text').and.to.not.equal('')
                // chai.expect(res.body.status).to.have.property('errorMessage').and.to.equal('Some data is missing')

                done()
            })
    })

    it('should return 400 on auth/login when password is invalid', (done: any) => {
        const mockLoginData = {
            up: new Buffer(mockSendData.email + ':wrongpassword').toString('base64')
        }

        chai.request(`http://localhost:${serverPort}`)
            .post('/auth/login')
            .send(mockLoginData)
            .end((err: any, res: any) => {
                if (err) {
                    res.should.have.status(400)
                }

                chai.expect(res).to.have.property('text').and.to.not.equal('')
                // chai.expect(res.body.status).to.have.property('errorMessage').and.to.equal('Invalid credentials')

                done()
            })
    })
})
