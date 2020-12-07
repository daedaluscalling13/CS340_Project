express = require('express');
router = express.Router();

const countriesController = require(`../controllers/countries/countries.js`);

router.get('/', (req,res) => {
    var context = {}
    context.confirm_text = ""

    countriesController.get_countries(req, res, context)
    .then((promiseResult) => {
        res.render('country', context)
    })
    .catch(err => console.log(err));
});

router.post('/', (req, res) =>{
    var context = {}
    context.confirm_text = "Deleted country"

    countriesController.delete_country(req, res, context)
    .then((promiseResult)=>{
        countriesController.get_countries(promiseResult.req, promiseResult.res, promiseResult.context)
        .then((promiseInfo) => {
            res.render('country', promiseInfo.context)
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;