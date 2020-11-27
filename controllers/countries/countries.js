const mysql = require('../../dbcon.js')

//---------------------------------------Query Definitions---------------------------------
const selectCountriesQuery = `SELECT countryID, countryName FROM countries`

const insertCountryQuery = `INSERT INTO countries (countryName)
    VALUES(
        ?
    )`

const updateCountryQuery = `UPDATE countries SET countryName=? WHERE id=?`

const deleteCountryQuery = `DELETE countries WHERE id=?`

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

exports.update_country = async(req, res) => {
    return new Promise((resolve, reject) => {
        try{
            var promiseInfo = {}
            promiseInfo.req = req
            promiseInfo.res = res
            promiseInfo.context = context

            var {id, countryName} = req.body
            mysql.pool.query(updateCountryQuery, [countryName, id], (req, res)=>{
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

exports.delete_country = async(req, res) => {
    return new Promise((resolve, reject) => {
        try{
            var promiseInfo = {}
            promiseInfo.req = req
            promiseInfo.res = res
            promiseInfo.context = context

            var {id} = req.body
            mysql.pool.query(deleteCountryQuery, [id], (req, res)=>{
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