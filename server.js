var express = require('express')
var path = require('path')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use('/dist', express.static(path.join(__dirname, '/dist')))

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(app.get('port'), function () {
  console.log('Express server started on port', app.get('port'))
})
