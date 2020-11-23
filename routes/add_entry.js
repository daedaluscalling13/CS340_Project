express = require('express');
router = express.Router();

const locationController = require(`../controllers/locations/locations.js`);
const categoryController = ('../categories/categories.js')

router.get('/', (req,res) =>{
    locationController.get_locations('add_entry', req, res);
});

module.exports = router;