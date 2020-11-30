express = require('express');
router = express.Router();

const entriesController = require(`../controllers/travelEntries/travelEntries.js`)
const locationController = require(`../controllers/locations/locations.js`);
const categoryController = require('../controllers/categories/categories.js')

router.get('/', async (req,res) =>{
    var context = {}
    context.confirm_text = ""
    locationController.get_locations(req, res, context)
    .then((result) => {
        categoryController.get_categories(result.req, result.res, result.context)
        .then((promiseInfo)=> {
            res.render('add_entry', promiseInfo.context)
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.post('/', async (req, res) =>{
    var context = {}
    context.confirm_text = "Entry added!"
    entriesController.insert_entry(req, res, context)
    .then((promiseResult)=>{
            locationController.get_locations(promiseResult.req, promiseResult.res, promiseResult.context)
        .then((result) => {
            categoryController.get_categories(result.req, result.res, result.context)
            .then((promiseInfo)=> {
                res.render('add_entry', promiseInfo.context)
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;