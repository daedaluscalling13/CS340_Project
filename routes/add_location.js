express = require('express');
router = express.Router();

const countryController = require(`../controllers/countries/countries.js`);
const locationController = require(`../controllers/locations/locations.js`);

router.get('/', (req,res) =>{
    countryController.get_countries('add_location', req, res);
});

router.post('/', (req, res)=>{
    locationController.add_location(req, res);
});

module.exports = router;