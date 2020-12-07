express = require('express');
router = express.Router();

const entriesController = require(`../controllers/travelEntries/travelEntries.js`);

router.get('/', async (req,res) =>{
    var context = {}
    entriesController.get_all_entries(req, res, context)
    .then((promiseResult) =>{
        promiseResult.res.render('entry', promiseResult.context)
    })
    .catch(err => console.log(err));
});

router.post('/', async (req, res) =>{
    var context = {}
    context.confirm_text = "Entry deleted!"
    
    entriesController.delete_entry(req, res, context)
    .then((promiseResolve) => {
        entriesController.get_all_entries(promiseResolve.req, promiseResolve.res, promiseResolve.context)
        .then((promiseResult)=>{
            promiseResult.res.render('entry', promiseResult.context)
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;