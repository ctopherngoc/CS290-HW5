var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extemded: false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 6051);

// sets up home page with form
app.get('/',function(req,res){
  var context = {};
  res.render('home.handlebars', context)
});

// get query will print out parameter and value in a table format
app.get('/get', function(req, res) {
  var qParams = [];
  for (var p in req.query) {
    qParams.push({'name': p, 'value': req.query[p]})
  }
  var context = {};
  context.dataList = qParams;
  res.render('get', context);
});

// allows get on the post page
app.get('/post', function(req, res) {
  var qParams = [];
  for (var p in req.query) {
    qParams.push({'name': p, 'value': req.query[p]})
  }
  var context = {};
  context.dataList = qParams;
  res.render('post', context);
});

// form form home page will post to post page
app.post('/post', function(req,res, next){

  // will take parameter and values from json or url and display as a table
  var qParams = [];
  for (var p in req.body){
    qParams.push({'name':p,'value':req.body[p]})
  }
  var context = {};
  context.dataList = qParams;
  res.render('post', context);
});

// sends error page if url is incorrect
app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found')
});

// sends server error if server issues arises
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip1.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
