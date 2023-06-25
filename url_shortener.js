// Define urlShortener function
function urlShortener() {
  // 定義包含所有大小寫字母及數字的常數
  const collection = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

  // 定義包含隨機抽取出的五個字元之常數
  let shortenedUrl = ''

  // 隨機抽出五個字元的方法
  for (let i = 0; i < 5; i++) {
    const collectionArray = collection.split('') // 將collection轉為陣列
    const pickOne = collectionArray[Math.floor(Math.random() * collectionArray.length)] // 隨機由陣列中抽出一個字元
    shortenedUrl += pickOne
  }

  // 回傳值
  return shortenedUrl
}

// 匯出urlShortener function
module.exports = urlShortener