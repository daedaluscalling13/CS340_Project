const express = require('express');
const mysql = require('../dbcon.js')
const router = express.Router();

const categoriesController = require(`../controllers/categories/categories.js`);

router.get('/', async function(req, res, next) {
    var context = {};
   
    categoriesController.get_categories(req, res, context).then((promiseResult) => {
       console.log(promiseResult.context)
        res.render('edit_category', promiseResult.context)
    }).catch(err => console.log(err)); 
  
})

module.exports = router