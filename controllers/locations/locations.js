const mysql = require('../../dbcon.js')

//---------------------------------------Query Definitions---------------------------------
const selectLocationsQuery = `SELECT locationID, name, city, streetAddress FROM locations`

const insertLocationQuery = `INSERT INTO locations (name, countryID, city, streetAddress)
    VALUES(
        ?,
        ?,
        ?,
        ?
    )`

const updateLocationQuery = `UPDATE locations SET
        name=?,
        countryID=?,
        city=?,
        streetAddress=?
        WHERE id=?
    `
const deleteLocationQuery = `DELETE FROM locations WHERE id=?`

//---------------------------------------Controllers---------------------------------

exports.get_locations = (req, res, context) =>{
    return new Promise((resolve, reject) => {
        try{
            var promiseInfo = {}
            promiseInfo.req = req
            promiseInfo.res = res
            promiseInfo.context = context    

            mysql.pool.query(selectLocationsQuery, (err, rows, fields) =>{
                try{
                    promiseInfo.context.locationList = rows
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

exports.add_location = async(req, res, context) => {
    return new Promise((resolve, reject) => {
        try{
            var promiseInfo = {}
            promiseInfo.req = req
            promiseInfo.res = res
            promiseInfo.context = context

            var {name, countryID, city, streetAddress} = req.body
            mysql.pool.query(insertLocationQuery, [name, countryID, city, streetAddress], (req, res)=>{
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

exports.update_location = async(req, res) => {
    return new Promise((resolve, reject) => {
        try{
            var promiseInfo = {}
            promiseInfo.req = req
            promiseInfo.res = res
            promiseInfo.context = context

            var {id, name, countryID, city, streetAddress} = req.body
            mysql.pool.query(updateLocationQuery, [name, countryID, city, streetAddress, id], (req, res)=>{
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

exports.delete_location = async(req, res) => {
    return new Promise((resolve, reject) => {
        try{
            var promiseInfo = {}
            promiseInfo.req = req
            promiseInfo.res = res
            promiseInfo.context = context

            var {id} = req.body
            mysql.pool.query(deleteLocationQuery, [id], (req, res)=>{
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