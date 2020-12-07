const express = require('express');
const router = express.Router();

const locationController = require(`../controllers/locations/locations.js`);
const countryController = require(`../controllers/countries/countries.js`);

router.get('/', async (req, res) => {
    var context = {};
   
   locationController.get_locations(req, res, context)
   .then((promiseResult) => {
       countryController.get_countries(promiseResult.req, promiseResult.res, promiseResult.context)
       .then((result) => {
           res.render('location', result.context)
       })
       .catch(err => console.log(err))
    })
    .catch(err => console.log(err)); 
});

router.post('/', async (req, res) =>{
    var context = {};
    context.confirm_text = "Deleted location"

    locationController.delete_location(req, res, context)
    .then((promiseResolve) => {
        locationController.get_locations(promiseResolve.req, promiseResolve.res, promiseResolve.context)
        .then((promiseInfo) => {
            countryController.get_countries(promiseInfo.req, promiseInfo.res, promiseInfo.context)
            .then((result) => {
                res.render('location', result.context)
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err));
});

module.exports = router