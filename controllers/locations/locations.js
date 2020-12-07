const mysql = require('../../dbcon.js')

//---------------------------------------Query Definitions---------------------------------
const selectLocationsQuery = `SELECT * FROM locations
    JOIN countries ON locations.countryID = countries.countryID`

const selectEditQuery = `SELECT * FROM locations
    JOIN countries ON locations.countryID = countries.countryID
    WHERE locationID=?`

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
        WHERE locationID=?
    `
const deleteLocationQuery = `DELETE FROM locations WHERE locationID=?`

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

exports.get_edit_location = (req, res, context) => {
    return new Promise((resolve, reject) => {
        try {
            var promiseInfo = {}
            promiseInfo.req = req
            promiseInfo.req = res
            promiseInfo.context = context

            var {locationID} = req.query

            mysql.pool.query(selectEditQuery, [locationID], (err, rows, fields) => {
                try{
                    promiseInfo.context.location = rows[0]
                    resolve(promiseInfo)
                } catch (err) {
                    res.status(400).send({ message: err.message})
                }
            })
        } catch (err) {
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

exports.update_location = async(req, res, context) => {
    return new Promise((resolve, reject) => {
        try{
            var promiseInfo = {}
            promiseInfo.req = req
            promiseInfo.res = res
            promiseInfo.context = context

            var {locationID, name, countryID, city, streetAddress} = req.body
            mysql.pool.query(updateLocationQuery, [name, countryID, city, streetAddress, locationID], (req, res)=>{
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

exports.delete_location = async(req, res, context) => {
    return new Promise((resolve, reject) => {
        try{
            var promiseInfo = {}
            promiseInfo.req = req
            promiseInfo.res = res
            promiseInfo.context = context

            var {locationID} = req.body
            mysql.pool.query(deleteLocationQuery, [locationID], (req, res)=>{
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