const express = require('express')
const cors = require('cors')
const rateLimit = require('lambda-rate-limiter')
const requestIp = require('request-ip')
const routes = require('./routes')

const port = process.env.PORT || 3000
const server = express()

const limiter = rateLimit({
    interval: 1000 * 60 * 10
}).check

server.use(cors())

server.use((req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate')
    limiter(10, requestIp.getClientIp(req))
        .then(() => next())
        .catch(() => res.status(429).send({
            code: 429,
            status: 'Too Many Requests',
            message: 'You have exceeded the rate limit. Try again in a few minutes.',
            data: {}
        }))
})

server.use(express.json())

server.use(routes)

server.listen(port, () => {
    console.log('Server running at port:', port)
})
