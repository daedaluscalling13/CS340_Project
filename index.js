var express = require('express');
const mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
var endpoints = require('./endpoints.js')
handlebars.handlebars.registerHelper('ifCond', function (id1, id2, options) {
  if (id1 === id2) {
    return options.fn(this);
  }
  return options.inverse(this)
})

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static('./public/'));

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routers
const home = require('./routes/home.js');
const add_entry = require('./routes/add_entry.js');
const add_location = require('./routes/add_location.js');
const add_country = require('./routes/add_country.js');
const add_category = require('./routes/add_category.js');
const edit_entry = require(`./routes/edit_entry.js`)
const edit_locations = require('./routes/edit_location.js')
const edit_countries = require('./routes/edit_country.js')
const edit_category = require('./routes/edit_category.js')



// const router = express.Router()
// app.use(router);
// router.get('/api', (request, response) => {
//   response.json({ info: 'Node.js, Express, and Postgres API' })
// })
app.use('/home', home)
app.use('/add_entry', add_entry)
app.use('/add_location', add_location)
app.use('/add_country', add_country)
app.use('/add_category', add_category)
app.use('/edit_entry', edit_entry)
app.use('/edit_category', edit_category)
app.use('/edit_location', edit_locations)
app.use('/edit_country', edit_countries)

app.get('/', (req, res) => {
  res.redirect('/home');
});

// app.get('/edit_entry', function (req, res) {
//   });


// app.get('edit_location', function (req, res) {
//   res.render('edit_location')
// })

app.get('/edit_country', function (req, res) {
  res.render('edit_country');
});

app.get('/edit_category', function (req, res) {
  res.render('edit_category');
});

app.get('/other-page', function (req, res) {
  res.render('other-page');
});

// app.get('/delete_entry', function(req, res){
//   res.render('delete_entry');
// });


// var db = require('./endpoints.js')
// router.get('/api/entries', db.getEntries)
// router.post('/api/entries', db.createEntry)
// router.put('/api/entries/:eid', db.updateEntry)
// router.delete('/api/entries/:eid', db.deleteEntry)

function genContext() {
  var stuffToDisplay = {};
  stuffToDisplay.time = (new Date(Date.now())).toLocaleTimeString('en-US');
  return stuffToDisplay;
}

app.get('/time', function (req, res) {
  res.render('time', genContext());
});

app.use(function (req, res) {
  res.status(404);
  res.render('404');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
