express = require('express');
router = express.Router();

const categoriesController = require(`../controllers/categories/categories.js`);

router.get('/', (req,res) =>{
    var context = {}
    context.confirm_text = ""
    res.render('add_category', context)
});

router.post('/', (req, res) =>{
    var context = {}
    context.confirm_text = "Category added!"
    categoriesController.add_category(req, res, context)
    .then((promiseResult) => {
        promiseResult.res.render('add_category', promiseResult.context)
    })
    .catch(err => console.log(err));
});

module.exports = router;