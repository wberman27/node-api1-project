// BUILD YOUR SERVER HERE
const express = require('express')
const Hero = require('./users/model.js')

const server = express()
server.use(express.json())






module.exports = server; // EXPORT YOUR SERVER instead of {}
