var express = require('express');
var mongoose = require('mongoose');

var app = express();
app.use(express.bodyParser());

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.
});

// use this mongo command line command to create servertalk database
// mongo --eval "db.getSiblingDB('servertalk').addUser('root', 'root');"
// use this mongo command line command to drop the servertalk database
// mongo servertalk --eval "db.dropDatabase()"
mongoose.connect('mongodb://localhost/servertalk');

var quoteSchema = new mongoose.Schema({
  author: { type: String }
, text: String
, year: Number
, hasCreditCookie: Boolean
});

var Quote = mongoose.model('Quote', quoteSchema);

Quote.find({}, function(err, quotes) {
  
  var numQuotes = quotes.length;
  console.dir('numQuotes = '+numQuotes);

  if (numQuotes == 0) {

      console.dir('adding quotes');

      var newQuotes = Array();

      newQuotes.push(new Quote({
        author: 'Audrey Hepburn'
      , text: 'Nothing is impossible, the word itself says \'I\'m possible\'!'
      , year: '2011'  
      , hasCreditCookie: true
      }));

      newQuotes.push(new Quote({
        author: 'Walt Disney'
      , text: 'You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you'
      , year: '2012'  
      , hasCreditCookie: true
      }));  

      for (var index = 0; index < newQuotes.length; index++) {
        console.dir('index = '+index);
        newQuotes[index].save(function(err, quote) {
          if (err) {
            return console.error(err);
          } 
          console.dir(quote);
        });    
      }

    }

});

app.get('/', function(req, res) {

  // Find all quotes.
  Quote.find({}, function(err, quotes) {
    if (err) return console.error(err);
    res.json(quotes);
  });

});

app.get('/quote/random', function(req, res) {

  /*
  var id = Math.floor(Math.random() * numQuotes);
  var q = quotes[id];

  res.json(q);
  */

});

app.get('/quote/:id', function(req, res) {
  
  // Find a quote by its id
  console.dir(req.params.id);
  Quote.find({_id: req.params.id}, function(err, quotes) {
    if (err) return console.error(err);
    res.json(quotes);
  });

});

app.post('/quote', function(req, res) {

  console.dir(req.body);

  if(!req.body.hasOwnProperty('author') || 
     !req.body.hasOwnProperty('text')   || 
     !req.body.hasOwnProperty('year')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }

  var newQuote = new Quote({
    author: req.body.author
  , text: req.body.text
  , year: req.body.year 
  , hasCreditCookie: true
  });

  newQuote.save(function(err, quote) {
    if (err) return console.error(err);
    console.dir(newQuote);
  });

  res.json(true);

});

app.delete('/quote/:id', function(req, res) {

  // Delete a quote by its id
  console.dir(req.params.id);
  Quote.remove({_id: req.params.id}, function(err, quotes) {
    if (err) return console.error(err);
    res.json(true);
  });

});

app.listen(process.env.PORT || 4730);


