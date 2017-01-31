const http = require('http')
const assert = require('assert')
const chaiHttp = require('chai-http')
const querystring = require('query-string')



const server = require('../src/app')

describe('/', () => {
    const chai = require('chai')
    const should = chai.should()
    chai.use(chaiHttp)

    it('should return 200 on health check', (done) => {
        chai.request('http://localhost:5050')
            .get('/')
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})

describe('/user', () => {
    const chai = require('chai')
    const should = chai.should()
    chai.use(chaiHttp)

    it('should return 400 on PUT empty user', (done) => {
        chai.request('http://localhost:5050')
            .put('/user')
            .send({})
            .end((err, res) => {
                res.should.have.status(400)
                done()
            })
    })
})
