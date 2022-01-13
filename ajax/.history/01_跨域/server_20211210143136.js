const express = require('express')

const app = express()

app.get('/home', (request, response) => {
  // 响应一个页面
  response.sendFile(__dirname + './index.html')
})