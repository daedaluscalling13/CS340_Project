const mysql = require('../../dbcon.js')

//---------------------------------------Query Definitions---------------------------------
const selectLocationsQuery = `SELECT locationID, name FROM locations`

const insertLocationQuery = `INSERT INTO locations (name, countryID, city, streetAddress)
    VALUES(
        ?,
        ?,
        ?,
        ?
    )`

//---------------------------------------Controllers---------------------------------

exports.get_locations = (req, res, context) =>{
    return new Promise((resolve, reject) => {
        var promiseInfo = {}
        promiseInfo.req = req
        promiseInfo.res = res
        promiseInfo.context = context
        try{
            mysql.pool.query(selectLocationsQuery, (err, rows, fields) =>{
                try{
                    promiseInfo.context.locationList = rows
                    resolve(promiseInfo)
                } catch (err) {
                    res.status(400).send({ message: err.message });
                }
            });
        } catch (err){
            reject('Error: Something went wrong')
        }
    })
}

exports.add_location = async(req, res) =>{
    var {name, countryID, city, streetAddress} = req.body
    mysql.pool.query(insertLocationQuery, [name, countryID, city, streetAddress], (req, res)=>{
        try{
            var context = {}
            res.redirect('back');
        } catch (err){
            res.status(400).send({message: err.message});
        }
    });
}