const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const routes = require('./routes')

const port = process.env.PORT || 3000
const server = express()

server.use(cors())

server.use((_, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate')
    next()
})

/**
 * Only on my production server
 * you can probably remove this code
 * if your server won't to have rate limitter API usage
 * Max: 100 Request/10 minutes
 */
server.use(rateLimit({
	windowMs: 1000 * 60 * 10,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).send({
            code: 429,
            status: 'Too Many Requests',
            message: 'Requests have limit exceeded, please try again later.',
            data: {}
        })
    }
}))

server.use(express.json())

server.use(routes)

server.listen(port, () => {
    console.log('Server running at port:', port)
})
