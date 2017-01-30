const http = require('http')
const assert = require('assert')
const querystring = require('query-string')

const server = require('../src/app');

describe('/', () => {
    it('should return 200 on health check', (done) => {
        http.get('http://localhost:5050/', (res) => {
            assert.equal(200, res.statusCode)
            done()
        })
    })
})

// describe('/user', () => {
//     it('should return 200 on PUT user', (done) => {
//         const postData = querystring.stringify({
//             'msg': 'Hello World!'
//         });

//         const options = {
//             hostname: 'http://localhost',
//             port: 5050,
//             path: '/user',
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'Content-Length': Buffer.byteLength(postData)
//             }
//         }

//         const req = http.request(options, (res) => {
//             res.on('end', (d) => {
//                 assert.equal(200, res.statusCode)
//                 done()
//             })
//         })

//         req.on('error', (e) => {
//             console.log(`problem with request: ${e.message}`)
//         });

//         req.end(postData)
//     })
// })