express = require('express');
router = express.Router();

const categoriesController = require(`../controllers/categories/categories.js`);

router.get('/', async (req, res) => {
    var context = {};
    context.confirm_text = ""
   
    categoriesController.get_categories(req, res, context)
    .then((promiseResult) => {
        res.render('category', promiseResult.context)
    })
    .catch(err => console.log(err)); 
})

router.post('/', async (req, res) => {
    var context = {};
    context.confirm_text = "Category deleted"

    categoriesController.delete_category(req, res, context)
    .then((promiseResult) =>{
        categoriesController.get_categories(promiseResult.req, promiseResult.res, promiseResult.context)
        .then((result) => {
            res.render('category', result.context)
        })
        .catch(err => console.log(err)); 
    })
    .catch(err => console.log(err));
})

module.exports = router