var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res){
  travelEntries = {}

  let entryList = Array()

  eventDate = new Date()
  eventTime = "This is some time.";
  rome_location = {name: "Rome"};
  mycategory = {name: "Event"};

  testEntry = {
    title: "Test Entry",
    dateOfEvent: eventDate,
    location: rome_location,
    category: mycategory,
    groupSize: 9,
    comments: "These are some comments",
    review: "This is a reveiw"
  };

  entryList.push(testEntry)

  travelEntries.entryList = entryList;

  res.render('home', travelEntries);
});

app.get('/new_entry', function(req, res){
  res.render('new_entry');
});

app.get('/edit_entry', function(req, res){
  res.render('edit_entry');
});

app.get('/new_location', function(req, res){
  res.render('new_location');
});

app.get('/edit_location', function(req, res){
  res.render('edit_location');
});

app.get('/new_country', function(req, res){
  res.render('new_country');
});

app.get('/edit_country', function(req, res){
  res.render('edit_country');
});

app.get('/new_category', function(req, res){
  res.render('new_category');
});

app.get('/edit_category', function(req, res){
  res.render('edit_category');
});

app.get('/other-page',function(req,res){
  res.render('other-page');
});

app.get('/delete_entry', function(req, res){
  res.render('delete_entry');
});


function genContext(){
  var stuffToDisplay = {};
  stuffToDisplay.time = (new Date(Date.now())).toLocaleTimeString('en-US');
  return stuffToDisplay;
}

app.get('/time',function(req,res){
  res.render('time', genContext());
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
