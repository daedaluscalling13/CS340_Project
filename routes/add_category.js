express = require('express');
router = express.Router();

const categoriesController = require(`../controllers/categories/categories.js`);

router.get('/', (req,res) =>{
    res.render('add_category')
});

router.post('/', (req, res) =>{
    categoriesController.insert_category('add_category', req, res);
});

module.exports = router;