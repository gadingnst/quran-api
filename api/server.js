const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const port = process.env.PORT || 3000
const server = express()

server.use(cors())

server.use((_, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate')
    next()
})

server.use(express.json())

server.use(routes)

server.listen(port, () => {
    console.log('Server running at port:', port)
})
