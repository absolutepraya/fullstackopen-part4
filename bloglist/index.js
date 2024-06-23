const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const Blog = require('./models/blog')

app.use(cors())
app.use(express.json())

const PORT = 3003
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}, url: http://localhost:${PORT}`)
})