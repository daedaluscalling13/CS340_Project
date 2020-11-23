express = require('express');
router = express.Router();

const countriesController = require(`../controllers/countries/countries.js`);

router.get('/', (req,res) =>{
    res.render('add_country')
});

router.post('/', (req, res) =>{
    countriesController.insert_country('add_country', req, res);
});

module.exports = router;