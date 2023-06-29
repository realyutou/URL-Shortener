// 引用Express與Express路由器
const express = require('express')
const router = express.Router()

//引入home模組程式碼
const home = require('./modules/home')

// 將網址符合'/'字串的request導向home模組
router.use('/', home)

// 匯出路由器
module.exports = router