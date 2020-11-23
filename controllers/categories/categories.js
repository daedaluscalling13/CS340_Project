const mysql = require('../../dbcon.js')

//---------------------------------------Query Definitions---------------------------------
const selectCategoriesQuery = `SELECT categoryID, categoryName FROM categories`

const insertCategoryQuery = `INSERT INTO categories (categoryName)
    VALUES(
        ?
    )`

//---------------------------------------Controllers---------------------------------
exports.get_category = async(page, req, res) =>{
    mysql.pool.query(selectCategoriesQuery, (err, rows, fields) =>{
        try{
            var context = {}
            context.categoryList = rows
            console.log(context.categoryList)
            // res.render(`${page}`, context)
        } catch (err) {
            res.status(400).send({ message: err.message })
        }
    });
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