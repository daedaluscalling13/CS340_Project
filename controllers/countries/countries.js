const mysql = require('../../dbcon.js')

//---------------------------------------Query Definitions---------------------------------
const selectCountriesQuery = `SELECT countryID, countryName FROM countries`

const insertCountryQuery = `INSERT INTO countries (countryName)
    VALUES(
        ?
    )`

//---------------------------------------Controllers---------------------------------
exports.get_countries = async(page, req, res) =>{
    mysql.pool.query(selectCountriesQuery, (err, rows, fields) =>{
        try{
            var context = {}
            context.countryList = rows
            console.log(context.countryList)
            res.render(`${page}`, context)
        } catch (err) {
            res.status(400).send({ message: err.message })
        }
    });
}

exports.insert_country = async(page, req, res) =>{
    var {countryName} = req.body
    console.log(req.body)
    console.log(countryName)
    mysql.pool.query(insertCountryQuery, [countryName], (err, rows, fields) =>{
        try{
            var context = {}
            res.render(`${page}`, context)
        } catch (err) {
            res.status(400).send({ message: err.message })
        }
    });
}