express = require('express');
router = express.Router();

const countriesController = require(`../controllers/countries/countries.js`);

router.get('/', (req,res) =>{
    res.render('add_country')
});

router.post('/', (req, res) =>{
    var context = {}
    countriesController.insert_country(req, res, context)
    .then((promiseResult)=>{
        promiseResult.res.render('add_country');
    })
    .catch(err => console.log(err));
});

module.exports = router;