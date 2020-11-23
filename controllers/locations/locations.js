const mysql = require('../../dbcon.js')
const categoryController = ('../categories/categories.js')

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
//
// Promises are hard...
//
// exports.get_locations = async(page, req, res, next) =>{
//     mysql.pool.query(selectLocationsQuery, (err, rows, fields) =>{
//         try{
//             var context = {}
//             context.locationList = rows
//             next()
//         } catch (err) {
//             res.status(400).send({ message: err.message })
//         }
//     });
// }, (req, res) =>{
//     categoryController.get_categories(page, req, res)
// }

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