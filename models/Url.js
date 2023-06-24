// Include packages and define model related variables
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 定義Url資料結構
const urlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true
  },
  shortenedUrl: {
    type: String,
    required: true
  }
})

// 匯出Url model
module.exports = mongoose.model('Url', urlSchema)