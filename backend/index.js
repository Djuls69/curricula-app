const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const app = express()

// Database
require('./db')()

// Middlewares
app.use(express.json())
app.use(helmet())
app.use(cors())

// Routes
app.use('/api/curricula', require('./server/api/curricula'))

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log('Server started'))
