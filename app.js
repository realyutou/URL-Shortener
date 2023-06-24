// Include packages and define server related variables
const express = require('express')
const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
} // Include dotenv only in non-production environment

const app = express()
const port = 3000

// Set MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Access MongoDB connecting situation
const db = mongoose.connection

db.on('error', () => {
  console.log('MongoDB error!')
})

db.once('open', () => {
  console.log('MongoDB connected!')
})

// Set routes
app.get('/', (req, res) => {
  res.send('URL Shortener')
})

// Start and listen the server
app.listen(port, () => {
  console.log(`The server is running on https://localhost:${port}`)
})