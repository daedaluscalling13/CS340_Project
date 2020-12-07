const mysql = require('../../dbcon.js')

//---------------------------------------Query Definitions---------------------------------
const selectCategoriesQuery = `SELECT * FROM categories`

const selectEditQuery = `SELECT * FROM categories WHERE categoryID=?`

const insertCategoryQuery = `INSERT INTO categories (categoryName)
    VALUES(
        ?
    )`

const updateCategoryQuery = `UPDATE categories SET categoryName=? WHERE categoryID=?`

const deleteCategoryQuery = `DELETE FROM categories WHERE categoryID=?`

//---------------------------------------Controllers---------------------------------
exports.get_categories = (req, res, context) =>{
    return new Promise((resolve, reject) => {
        try{
            var promiseInfo = {}
            promiseInfo.req = req
            promiseInfo.res = res
            promiseInfo.context = context    

            mysql.pool.query(selectCategoriesQuery, (err, rows, fields) =>{
                try{
                    promiseInfo.context.categoryList = rows
                    resolve(promiseInfo)
                } catch (err) {
                    res.status(400).send({ message: err.message });
                }
            });
        } catch (err){
            reject({ message : err.message })
        }
    })
}

exports.get_edit_category = (req, res, context) =>{
    return new Promise((resolve, reject) => {
        try{
            var promiseInfo = {}
            promiseInfo.req = req
            promiseInfo.res = res
            promiseInfo.context = context
            
            var {categoryID} = req.query

            mysql.pool.query(selectEditQuery, [categoryID], (err, rows, fields) =>{
                try{
                    promiseInfo.context.category = rows[0]
                    resolve(promiseInfo)
                } catch (err) {
                    res.status(400).send({ message: err.message });
                }
            });
        } catch (err){
            reject({ message : err.message })
        }
    })
}

exports.add_category = async(req, res, context) => {
    return new Promise((resolve, reject) => {
        try{
            var promiseInfo = {}
            promiseInfo.req = req
            promiseInfo.res = res
            promiseInfo.context = context

            var {categoryName} = req.body
            mysql.pool.query(insertCategoryQuery, [categoryName], (req, res)=>{
                try{
                    resolve(promiseInfo);
                } catch (err){
                    res.status(400).send({message: err.message});
                }
            });
        } catch (err){
            reject({ message: err.message });
        }
    });
}

exports.update_category = async(req, res, context) => {
    return new Promise((resolve, reject) => {
        try{
            var promiseInfo = {}
            promiseInfo.req = req
            promiseInfo.res = res
            promiseInfo.context = context

            var {categoryID, categoryName} = req.body
            mysql.pool.query(updateCategoryQuery, [categoryName, categoryID], (req, res)=>{
                try{
                    resolve(promiseInfo);
                } catch (err){
                    res.status(400).send({message: err.message});
                }
            });
        } catch (err){
            reject({ message: err.message });
        }
    });
}

exports.delete_category = async(req, res, context) => {
    return new Promise((resolve, reject) => {
        try{
            var promiseInfo = {}
            promiseInfo.req = req
            promiseInfo.res = res
            promiseInfo.context = context

            var {categoryID} = req.body
            mysql.pool.query(deleteCategoryQuery, [categoryID], (req, res)=>{
                try{
                    resolve(promiseInfo);
                } catch (err){
                    res.status(400).send({message: err.message});
                }
            });
        } catch (err){
            reject({ message: err.message });
        }
    });
}