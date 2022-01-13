const express = require('express')

const app = express()

app.all('/cors-server', (request, response) => {
  response.send('hello cors')
})