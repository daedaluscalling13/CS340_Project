express = require('express');
router = express.Router();

const countryController = require(`../controllers/countries/countries.js`);
const locationController = require(`../controllers/locations/locations.js`);

router.get('/', async (req,res) =>{
    var context = {}
    context.confirm_text = ""
    countryController.get_countries(req, res, context)
    .then((promiseResult) =>{
        promiseResult.res.render('add_location', promiseResult.context)
    })
    .catch(err => console.log(err));
});

router.post('/', (req, res)=>{
    var context = {}
    context.confirm_text = "Location added!"
    locationController.add_location(req, res, context)
    .then((promiseResult) =>{
        promiseResult.res.render('add_location', promiseResult.context)
    })
    .catch(err => console.log(err));
});

module.exports = router;