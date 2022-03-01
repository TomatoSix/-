const express = require('express')

const app = express()

app.all('/cors-server', (request, response) => {
  // 设置响应头, *表示接受任何域名的请求
  response.setHeader("Access-Control-Allow-Origin","*")
  response.setHeader("Access-Control-Allow-Headers","*")
  response.send('hello cors')
})

// fetch服务
app.all('/fetch-server', (request, response) => {
  // 设置响应头, *表示接受任何域名的请求
  response.setHeader("Access-Control-Allow-Origin","*")
  response.setHeader("Access-Control-Allow-Headers","*")

  const data = {name: "番茄炒小六"}
  response.send(JSON.stringify(data))
})

app.listen('8000', () => {
  console.log('8000端口已经开启');
})