express = require('express');
router = express.Router();

const entriesController = require(`../controllers/travelEntries/travelEntries.js`)
const locationController = require(`../controllers/locations/locations.js`);
const categoryController = require('../controllers/categories/categories.js')

router.get('/', async (req,res) =>{
    var context = {}
    context.confirm_text = ""

    entriesController.select_edit_entry(req, res, context)
    .then((promiseResult)=>{
        locationController.get_locations(promiseResult.req, promiseResult.res, promiseResult.context)
        .then((result) => {
            categoryController.get_categories(result.req, result.res, result.context)
            .then((promiseInfo)=> {
                res.render('edit_entry', promiseInfo.context)
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));    
    })
    .catch(err => console.log(err))
});

router.post('/', async (req, res) =>{
    var context = {}
    context.confirm_text = "Entry edited!"
    entriesController.update_entry(req, res, context)
    .then((promiseResolve) => {
        promiseResolve.req.query.entryID = promiseResolve.req.body.entryID
        entriesController.select_edit_entry(promiseResolve.req, promiseResolve.res, promiseResolve.context)
        .then((promiseResult)=>{
                locationController.get_locations(promiseResult.req, promiseResult.res, promiseResult.context)
            .then((result) => {
                categoryController.get_categories(result.req, result.res, result.context)
                .then((promiseInfo)=> {
                    res.render('edit_entry', promiseInfo.context)
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;