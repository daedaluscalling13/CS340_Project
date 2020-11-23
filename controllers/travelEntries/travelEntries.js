const mysql = require('../../dbcon.js')

//---------------------------------------Query Definitions---------------------------------
// Query to populate the home page
const selectLatestQuery = `SELECT * FROM travelEntries
    JOIN locations ON travelEntries.locationID = locations.locationID
    JOIN categories ON travelEntries.categoryID = categories.categoryID
    WHERE entryID>=((SELECT MAX(entryID) FROM travelEntries)-5)`

// Query to populate the results page
const selectSearchQuery = `SELECT * FROM travelEntries
    JOIN
    (SELECT * FROM travelEntries_locations
    JOIN locations ON travelEntries.lid = locations.locationID
    WHERE locations.name =?)
    ON travelEntries.entryID = travelEntries_location.tid`

// Query to populate the edit TravelEntry page
const selectEditQuery = `SELECT * FROM travelEntries
    INNER JOIN locations ON travelEntries.locationID = locations.locationID
    INNER JOIN categories ON travelEntries.categoryID = categories.categoryID
    WHERE entryID=?`

// Query to add a new TravelEntry
const insertEntryQuery = `INSERT INTO travelEntries (userID, DOE, timeOfDay, locationID, categoryID, title, comments, review, groupSize)
    VALUES(
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )`

// Query to update a TravelEntry from the edit TravelEntry page
const updateEntryQuery = `UPDATE TravelEntry SET
dateOfEntry=?,
timeOfDay=?,
locationID=?,
categoryID=?,
title=?,
comments=?,
review=?,
groupSize=?,
WHERE id=?`

// Query to delete a TravelEntry from the home page
// TODO: Add a confirmation before deleting?
const deleteEntryQuery = `DELETE FROM travelEntries WHERE id=?`


//---------------------------------------Controllers---------------------------------
exports.get_latest_entries = async(req, res) => {
    mysql.pool.query(selectLatestQuery, (err, rows, fields) => {
        try {
            var context = {};
            context.entryList = rows
            res.render('home', context)
        } catch (err) {
            res.status(400).send({ message: err.message })
        }
    });
}

// SELECT Results pages doesn't exist yet
//
// exports.get_search_entries = async(req, res) => {
//     mysql.pool.query(selectSearchQuery, (err, rows, fields) => {
//         try {
//             var context = {}
//             context.entryList = rows
//             res.render('results', context)
//         } catch (err) {
//             res.status(400).send({ message: err.message })
//         }
//     });
// }

// SELECT Edit page doesn't work yet
// TODO: How do I send the entryID to the controller with the form?
//
// exports.edit_latest_entries = async(req, res) => {
//     mysql.pool.query(selectEditQuery, (err, rows, fields) => {
//         try {
//             var context = {}
//             context.entryList = rows
//             res.render('edit_entry', context)
//         } catch (err) {
//             res.status(400).send({ message: err.message })
//         }
//     });
// }

exports.insert_entry = async(req, res) => {
    var {userID, DOE, timeOfDay, locationID, categoryID, title, comments, review, groupSize} = req.body;
    mysql.pool.query(insertEntryQuery, [useuserID, DOE, timeOfDay, locationID, categoryID, title, comments, review, groupSizerID], (err, rows, fields) => {
        try {
            res.redirect('/');
        } catch (err) {
            res.status(400).send({ message: err.message })
        }
    });
}

// UPDATE doesn't have to work yet
//
// exports.update_entry = async(req, res) => {
//     var {id, DOE, timeOfDay, locationID, categoryID, groupSize, comments, review} = req.body;
//     mysql.pool.query(selectLatestQuery, [DOE, timeOfDay, locationID, categoryID, groupSize, comments, review, id], (err, rows, fields) => {
//         try {
//             res.redirect('/')
//         } catch (err) {
//             res.status(400).send({ message: err.message })
//         }
//     });
// }

// DELETE doesn't have to work yet
//
// exports.delete_entry = async(req, res) => {
//     var {id} = req.body;
//     mysql.pool.query(selectLatestQuery, [id], (err, rows, fields) => {
//         try {
//             res.redirect('/')
//         } catch (err) {
//             res.status(400).send({ message: err.message })
//         }
//     });
// }