// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var sassMiddleware = require("node-sass-middleware");
const port = 3000;
const path = require('path');

app.use(sassMiddleware({
  src: path.join(__dirname, '/public/style'),
  dest: '/tmp',
  outputStyle: 'compressed'
}));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.static('/tmp'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});