// Include packages and define server related variables
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const urlShortener = require('./url_shortener')
const Url = require('./models/Url')

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

// Set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// Set body-parser
app.use(express.urlencoded({ extended: true }))

// Set routes
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/URL_Shortener', (req, res) => {
  const originalUrl = req.body.originalUrl
  const shortenedUrl = urlShortener()
  Url.findOne({ originalUrl: originalUrl })
    .lean()
    .then(data => {
      // 若資料庫中已存在相同originalUrl，則抓出該筆資料，避免產生另一組短網址
      if (data !== null) {
        return res.render('show', { port: port, shortenedUrl: data.shortenedUrl })
      } else {
        // 若無，建立該筆資料
        Url.create({
          originalUrl: originalUrl,
          shortenedUrl: shortenedUrl
        })
          .then(() => {
            res.render('show', { port: port, shortenedUrl: shortenedUrl })
          })
          .catch(error => console.log(error))
      }
    })
})

app.get('/:shortenedUrl', (req, res) => {
  const shortenedUrl = req.params.shortenedUrl //取得params內的短網址資料(shortenedUrl)
  Url.findOne({ shortenedUrl: shortenedUrl })
    .lean()
    .then(data => {
      res.redirect(data.originalUrl) //重新導向回原網址
    })
    .catch(error => console.log(error))
})

// Start and listen the server
app.listen(port, () => {
  console.log(`The server is running on https://localhost:${port}`)
})