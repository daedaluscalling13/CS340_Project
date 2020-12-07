express = require('express');
router = express.Router();

const locationController = require(`../controllers/locations/locations.js`);
const countryController = require(`../controllers/countries/countries.js`);

router.get('/', async (req, res) => {
    var context = {};
    context.confirm_text = ""
   
   locationController.get_edit_location(req, res, context)
   .then((promiseResult) => {
        countryController.get_countries(promiseResult.req, promiseResult.res, promiseResult.context)
        .then((result) => {
            res.render('edit_location', result.context)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err)); 
  

});

router.post('/', async (req, res) =>{
    var context = {};
    context.confirm_text = "Updated location"

    locationController.update_location(req, res, context)
    .then((promiseResolve) => {
        promiseResolve.req.query.locationID = promiseResolve.req.body.locationID
        locationController.get_edit_location(promiseResolve.req, promiseResolve.res, promiseResolve.context)
        .then((promiseInfo) => {
            countryController.get_countries(promiseInfo.req, promiseInfo.res, promiseInfo.context)
            .then((result) => {
                res.render('edit_location', result.context)
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err));
});

module.exports = router