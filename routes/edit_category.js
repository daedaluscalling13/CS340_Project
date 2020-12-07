express = require('express');
router = express.Router();

const categoriesController = require(`../controllers/categories/categories.js`);

router.get('/', async (req, res) => {
    var context = {};
    context.confirm_text = ""
   
    categoriesController.get_edit_category(req, res, context)
    .then((promiseResult) => {
       console.log(promiseResult.context)
        res.render('edit_category', promiseResult.context)
    })
    .catch(err => console.log(err)); 
})

router.post('/', async (req, res) => {
    var context = {}
    context.confirm_text = "Edited category"

    categoriesController.update_category(req, res, context)
    .then((promiseResult) => {
        promiseResult.req.query.categoryID = promiseResult.req.body.categoryID
        categoriesController.get_edit_category(promiseResult.req, promiseResult.res, promiseResult.context)
        .then((result) => {
            res.render('edit_category', result.context)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router