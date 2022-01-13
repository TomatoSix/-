const express = require('express')

const app = express()

app.all('/cors-server', (request, response) => {
  response.send('hello cors')
})

app.listen('8000', () => {
  console.log('8000端口已经开启');
})