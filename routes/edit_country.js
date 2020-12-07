const express = require('express');
const mysql = require('../dbcon.js')
const router = express.Router();

const countriesController = require(`../controllers/countries/countries.js`);

router.get('/', async (req, res) => {
    var context = {};
    context.confirm_text = ""

    countriesController.get_edit_country(req, res, context)
    .then((promiseResult) => {
        res.render('edit_country', promiseResult.context)
    })
    .catch(err => console.log(err)); 
})

router.post('/', async (req, res) => {
    var context = {};
    context.confirm_text = "Edited country"

    countriesController.update_country(req, res, context)
    .then((promiseResult) => {
        promiseResult.req.query.countryID = promiseResult.req.body.countryID
        countriesController.get_edit_country(promiseResult.req, promiseResult.res, promiseResult.context)
        .then((result) => {
            res.render('edit_country', result.context)
        })
        .catch(err => console.log(err)); 
    })
    .catch(err => console.log(err));
})

module.exports = router