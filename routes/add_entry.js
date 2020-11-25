express = require('express');
router = express.Router();

const locationController = require(`../controllers/locations/locations.js`);
const categoryController = require('../controllers/categories/categories.js')

router.get('/', async (req,res) =>{
    var context = {}
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

module.exports = router;