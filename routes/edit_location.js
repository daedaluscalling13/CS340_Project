const express = require('express');
const mysql = require('../dbcon.js')
const router = express.Router();

const locationController = require(`../controllers/locations/locations.js`);

router.get('/', async function(req, res, next) {
    console.log('here')
    var context = {};
   
   locationController.get_locations(req, res, context).then((promiseResult) => {
       console.log(promiseResult.context)
        res.render('edit_location', promiseResult.context)
    }).catch(err => console.log(err)); 
  

})

module.exports = router