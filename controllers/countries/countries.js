const mysql = require('../../dbcon.js')

//---------------------------------------Query Definitions---------------------------------
const selectCountriesQuery = `SELECT * FROM countries`

const selectEditQuery = `SELECT * FROM countries WHERE countryID=?`

const insertCountryQuery = `INSERT INTO countries (countryName)
    VALUES(
        ?
    )`

const updateCountryQuery = `UPDATE countries SET countryName=? WHERE countryID=?`

const deleteCountryQuery = `DELETE FROM countries WHERE countryID=?`

//---------------------------------------Controllers---------------------------------
exports.get_countries = (req, res, context) =>{
    return new Promise((resolve, reject) => {
        try{
            var promiseInfo = {}
            promiseInfo.req = req
            promiseInfo.res = res
            promiseInfo.context = context    

            mysql.pool.query(selectCountriesQuery, (err, rows, fields) =>{
                try{
                    promiseInfo.context.countryList = rows
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

exports.get_edit_country = (req, res, context) =>{
    return new Promise((resolve, reject) => {
        try{
            var promiseInfo = {}
            promiseInfo.req = req
            promiseInfo.res = res
            promiseInfo.context = context
            
            var {countryID} = req.query

            mysql.pool.query(selectEditQuery, [countryID], (err, rows, fields) =>{
                try{
                    promiseInfo.context.country = rows[0]
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

exports.add_country = async(req, res, context) => {
    return new Promise((resolve, reject) => {
        try{
            var promiseInfo = {}
            promiseInfo.req = req
            promiseInfo.res = res
            promiseInfo.context = context

            var {countryName} = req.body
            mysql.pool.query(insertCountryQuery, [countryName], (req, res)=>{
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

exports.update_country = async(req, res, context) => {
    return new Promise((resolve, reject) => {
        try{
            var promiseInfo = {}
            promiseInfo.req = req
            promiseInfo.res = res
            promiseInfo.context = context

            var {countryID, countryName} = req.body
            mysql.pool.query(updateCountryQuery, [countryName, countryID], (req, res)=>{
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

exports.delete_country = async(req, res, context) => {
    return new Promise((resolve, reject) => {
        try{
            var promiseInfo = {}
            promiseInfo.req = req
            promiseInfo.res = res
            promiseInfo.context = context

            var {countryID} = req.body
            mysql.pool.query(deleteCountryQuery, [countryID], (req, res)=>{
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