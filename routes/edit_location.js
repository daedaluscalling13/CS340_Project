const express = require('express');
const mysql = require('../dbcon.js')
const router = express.Router();

const locationController = require(`../controllers/locations/locations.js`);

router.get('/', async function(req, res, next) {
    console.log('here')
    var context = {};
    mysql.pool.query('SELECT * FROM locations'), function (err, result)  {
        if (err) {
            next(err);
            return;
        }
        console.log(result)
        var results = rows
        context.results = results
        console.log(context)
    }
    res.render('edit_location', context)

})

module.exports = router