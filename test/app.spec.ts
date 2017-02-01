const http = require('http')
const assert = require('assert')
const chaiHttp = require('chai-http')
const querystring = require('query-string')

const server = require('../src/app')
const serverPort = process.env.SERVER_PORT

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

    it('should return 400 on PUT empty identity', (done) => {
        chai.request(`http://localhost:${serverPort}`)
            .put('/identity')
            .send({})
            .end((err, res) => {
                if (err) {
                    res.should.have.status(400)
                    return done()
                }

                done()
            })
    })

})
