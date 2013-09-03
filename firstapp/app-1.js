var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.type('text/plain');
  res.send('hello from first node-express app');
});

app.listen(process.env.PORT || 4730);
