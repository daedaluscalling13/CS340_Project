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

router.post('/', async (req, res) =>{
    var context = {}
    entriesController.insert_entry(req, res, context)
    .then((promiseResult)=>{
        promiseResult.res.redirect('/')
    })
    .catch((err) => console.log(err));
});

router.put('/', async (req, res) => {
    // entriesController.
});

module.exports = router;