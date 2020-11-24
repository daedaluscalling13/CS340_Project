express = require('express');
router = express.Router();

const entriesController = require(`../controllers/travelEntries/travelEntries.js`);

router.get('/', (req,res) =>{
    entriesController.get_latest_entries(req, res);
});

router.post('/', (req, res) =>{
    entriesController.insert_entry(req, res);
});

module.exports = router;