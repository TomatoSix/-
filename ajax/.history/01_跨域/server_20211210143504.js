const express = require('express')

const app = express()

app.get('/home', (request, response) => {
  // 响应一个页面
  response.sendFile(__dirname + '/index.html')
})

app.listen(9000, () => {
  console.log("9000端口已经启动");
})