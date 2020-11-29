var express = require('express');
const mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/public", express.static('./public/'));

// Routers
const home = require('./routes/home.js');
// const add_entry = require('./routes/add_entry.js');
const add_location = require('./routes/add_location.js');
const add_country = require('./routes/add_country.js');
const add_category = require('./routes/add_category.js');

app.use('/home', home)
// app.use('/add_entry', add_entry)
app.use('/add_location', add_location)
app.use('/add_country', add_country)
app.use('/add_category', add_category)

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/add_entry', function(req, res){
  res.render('add_entry');
});

app.get('/edit_entry', function(req, res){
  res.render('edit_entry');
});

app.get('/addlocation', function(req, res){
  res.render('add_location');
});

app.get('/edit_location', function(req, res){
  res.render('edit_location');
});

// app.get('/new_country', function(req, res){
//   res.render('new_country');
// });

app.get('/edit_country', function(req, res){
  res.render('edit_country');
});

// app.get('/add_category', function(req, res){
//   res.render('add_category');
// });

app.get('/edit_category', function(req, res){
  res.render('edit_category');
});

app.get('/other-page',function(req,res){
  res.render('other-page');
});

app.get('/delete_entry', function(req, res){
  res.render('delete_entry');
});

const router = express.Router()
app.use(router);
router.get('/api', (req, res) => {
  res.json({info: 'Node.js, Express, MySQl API'})
})

// var db = require('./endpoints.js')
// router.get('/api/entries', db.getEntries)
// router.post('/api/entries', db.createEntry)
// router.put('/api/entries/:eid', db.updateEntry)
// router.delete('/api/entries/:eid', db.deleteEntry)

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
