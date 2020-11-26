const mysql = require('../../dbcon.js')

//---------------------------------------Query Definitions---------------------------------
const selectCategoriesQuery = `SELECT categoryID, categoryName FROM categories`

const insertCategoryQuery = `INSERT INTO categories (categoryName)
    VALUES(
        ?
    )`

const updateCategoryQuery = `UPDATE categories SET categoryName=? WHERE id=?`

const deleteCategoryQuery = `DELETE categories WHERE id=?`

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

exports.add_category = async(req, res) => {
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

exports.update_category = async(req, res) => {
    return new Promise((resolve, reject) => {
        try{
            var promiseInfo = {}
            promiseInfo.req = req
            promiseInfo.res = res
            promiseInfo.context = context

            var {id, categoryName} = req.body
            mysql.pool.query(updateCategoryQuery, [categoryName, id], (req, res)=>{
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

exports.delete_category = async(req, res) => {
    return new Promise((resolve, reject) => {
        try{
            var promiseInfo = {}
            promiseInfo.req = req
            promiseInfo.res = res
            promiseInfo.context = context

            var {id} = req.body
            mysql.pool.query(deleteCategoryQuery, [id], (req, res)=>{
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