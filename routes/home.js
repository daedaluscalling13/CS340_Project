express = require('express');
router = express.Router();

const entriesController = require(`../controllers/travelEntries/travelEntries.js`);

router.get('/', async (req,res) =>{
    var context = {}
    entriesController.get_latest_entries(req, res, context)
    .then((promiseResult) =>{
        promiseResult.res.render('home', promiseResult.context)
    })
    .catch(err => console.log(err));
});

router.put('/', async (req, res) =>{
    var context = {}
    context.confirm_text = "Entry edited!"
    console.log(req)
    entriesController.update_entry(req, res, context)
    .then((promiseResolve) => {
        entriesController.get_latest_entries(promiseResolve.req, promiseResolve.res, promiseResolve.context)
        .then((promiseResult)=>{
                locationController.get_locations(promiseResult.req, promiseResult.res, promiseResult.context)
            .then((result) => {
                categoryController.get_categories(result.req, result.res, result.context)
                .then((promiseInfo)=> {
                    res.render('home', promiseInfo.context)
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