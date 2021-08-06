const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

const notFound = (req, res) => {
    res.status(404).json({
        message: 'Page not found'
    })
}

const errHandler = (err, req, res) => {
    const status = err.status || 500
    res.status(status).json({
        message: err.message
    })
}

server.use(express.json())
server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)
server.use('*', notFound)
server.use(errHandler)

module.exports = server;
