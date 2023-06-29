// Include packages and define server related variables
const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000

// Set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// Set body-parser
app.use(express.urlencoded({ extended: true }))

// 將request導入路由器
app.use(routes)

// Start and listen the server
app.listen(port, () => {
  console.log(`The server is running on https://localhost:${port}`)
})
