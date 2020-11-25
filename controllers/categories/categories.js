const mysql = require('../../dbcon.js')

//---------------------------------------Query Definitions---------------------------------
const selectCategoriesQuery = `SELECT categoryID, categoryName FROM categories`

const insertCategoryQuery = `INSERT INTO categories (categoryName)
    VALUES(
        ?
    )`

//---------------------------------------Controllers---------------------------------
exports.get_categories = async(req, res, context) =>{
    return new Promise((resolve, reject) => {
        var promiseInfo = {}
        promiseInfo.req = req
        promiseInfo.res = res
        promiseInfo.context = context
        try{
            mysql.pool.query(selectCategoriesQuery, (err, rows, fields) =>{
                try{
                    promiseInfo.context.categoryList = rows
                    resolve(promiseInfo)
                } catch (err) {
                    res.status(400).send({ message: err.message });
                }
            });
        } catch (err){
            reject('Error: Something went wrong')
            // res.status(400).send({ message: err.message });
        }
    })
}

exports.insert_category = async(page, req, res) =>{
    var {categoryName} = req.body
    mysql.pool.query(insertCategoryQuery, [categoryName], (err, rows, fields) =>{
        try{
            var context = {}
            res.render(`${page}`, context)
        } catch (err) {
            res.status(400).send({ message: err.message })
        }
    });
}