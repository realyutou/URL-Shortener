// Include packages and define server related variables
const express = require('express')
const app = express()
const port = 3000

// Set routes
app.get('/', (req, res) => {
  res.send('URL Shortener')
})

// Start and listen the server
app.listen(port, () => {
  console.log(`The server is running on https://localhost:${port}`)
})