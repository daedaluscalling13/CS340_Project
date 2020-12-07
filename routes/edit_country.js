const express = require('express');
const mysql = require('../dbcon.js')
const router = express.Router();

const countriesController = require(`../controllers/countries/countries.js`);

router.get('/', async function(req, res, next) {
    var context = {};
   
    countriesController.get_countries(req, res, context).then((promiseResult) => {
       console.log(promiseResult.context)
        res.render('edit_country', promiseResult.context)
    }).catch(err => console.log(err)); 
  
})

module.exports = router