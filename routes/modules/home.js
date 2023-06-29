// 引用Express與Express路由器
const express = require('express')
const router = express.Router()

// 引用Url model
const Url = require('../../models/Url')

// 引用url_shortener model 
const urlShortener = require('../../url_shortener')

// 定義port
const port = 3000

// Set routes
// Home page
router.get('/', (req, res) => {
  res.render('index')
})

// 使用者傳送表單後可獲得一組縮網址
router.post('/URL_Shortener', (req, res) => {
  const originalUrl = req.body.originalUrl
  const shortenedUrl = urlShortener()
  Url.findOne({ originalUrl })
    .lean()
    .then(data => {
      // 若資料庫中已存在相同originalUrl，則抓出該筆資料，避免產生另一組短網址
      if (data !== null) {
        return res.render('show', { port, shortenedUrl: data.shortenedUrl })
      } else {
        // 若無，建立該筆資料
        Url.create({
          originalUrl,
          shortenedUrl
        })
          .then(() => {
            res.render('show', { port, shortenedUrl })
          })
          .catch(error => console.log(error))
      }
    })
})

// 使用者輸入短網址後可導向原網址
router.get('/:shortenedUrl', (req, res) => {
  const shortenedUrl = req.params.shortenedUrl // 取得params內的短網址資料(shortenedUrl)
  Url.findOne({ shortenedUrl })
    .lean()
    .then(data => {
      if (data !== null) {
        res.redirect(data.originalUrl) // 重新導向回原網址
      } else {
        res.render('error') // 若該縮址不存在，導向錯誤頁面
      }
    })
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router