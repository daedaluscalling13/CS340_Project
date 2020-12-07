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

module.exports = router;