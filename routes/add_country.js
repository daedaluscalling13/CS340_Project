express = require('express');
router = express.Router();

const countriesController = require(`../controllers/countries/countries.js`);

router.get('/', (req,res) =>{
    var context = {}
    context.confirm_text = ""
    res.render('add_country', context)
});

router.post('/', (req, res) =>{
    var context = {}
    context.confirm_text = "Country added!"
    countriesController.add_country(req, res, context)
    .then((promiseResult)=>{
        promiseResult.res.render('add_country', promiseResult.context);
    })
    .catch(err => console.log(err));
});

module.exports = router;