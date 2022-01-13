const express = require('express')

const app = express()

app.all('/students', (request, response) => {
  // 设置响应头
  // response.setHeader("Access-Control-Allow-Origin","*")
  const data = [
    {
      id: '1',
      name: 'six'
    },
    {
      id: '1',
      name: 'six'
    },{
      id: '1',
      name: 'six'
    }
  ]
  response.send('hello cors')
})

app.listen('5000', () => {
  console.log('5555端口已经开启');
})