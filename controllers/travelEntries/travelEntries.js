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
const updateEntryQuery = `UPDATE travelEntries SET
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
// SELECT
// Last 5 entries
exports.get_latest_entries = async(req, res, context) => {
    return new Promise((resolve, reject)=>{
        try{
            var promiseResult = {}
            promiseResult.res = res
            promiseResult.context = context

            mysql.pool.query(selectLatestQuery, (err, rows, fields) => {
                try {
                    promiseResult.context.entryList = rows
                    resolve(promiseResult);
                } catch (err) {
                    res.status(400).send({ message: err.message })
                }
            });

        } catch (err){
            reject({ message: err.message});   
        }
    });
    
}

// SELECT
// Entries that meet the location
exports.get_search_entries = async(req, res) => {
    return new Promise((resolve, reject) => {
        try{
            var promiseResult = {}
            promiseResult.req = req
            promiseResult.res = res
            promiseResult.context = context

            var {searchLocation} = req.body

            mysql.pool.query(selectSearchQuery, [searchLocation], (err, rows, fields) => {
                try {
                    promiseResult.context.entryList = rows
                    resolve(promiseResult);
                } catch (err) {
                    res.status(400).send({ message: err.message })
                }
            });
        } catch (err){

        }
    })
}

// SELECT
// An entry that we wish to edit
// TODO: How do I send the entryID to the controller with the form?
//
exports.edit_latest_entries = async(req, res) => {
    return new Promise((resolve, reject) => {
        try{
            var promiseResult = {}
            promiseResult.req = req
            promiseResult.res = res
            promiseResult.context = context
            
            var {id} = req.body

            mysql.pool.query(selectEditQuery, [id], (err, rows, fields) => {
                try {
                    promiseResult.context.entryList = rows
                    resolve(promiseResult);
                } catch (err) {
                    res.status(400).send({ message: err.message })
                }
            });
        } catch (err){
            reject({ message: err.message})
        }
    });
}

exports.insert_entry = async(req, res, context) => {
    return new Promise((resolve, reject) => {
        try {
            var promiseResult = {}
            promiseResult.req = req
            promiseResult.res = res
            promiseResult.context = context

            var {userID, DOE, timeOfDay, locationID, categoryID, title, comments, review, groupSize} = req.body;
            mysql.pool.query(insertEntryQuery, [useuserID, DOE, timeOfDay, locationID, categoryID, title, comments, review, groupSize], (err, rows, fields) => {
                try {
                    resolve(promiseResult)
                } catch (err) {
                    res.status(400).send({ message: err.message })
                }
            });

        } catch (err){
            reject({ message: err.message});
        }
    });
}

// UPDATE doesn't have to work yet
exports.update_entry = async(req, res) => {
    return new Promise((resolve, reject) =>{
        try{
            var promiseResult = {}
            promiseResult.req = req
            promiseResult.res = res
            promiseResult.context = context

            var {id, DOE, timeOfDay, locationID, categoryID, groupSize, comments, review} = req.body;
            mysql.pool.query(selectLatestQuery, [DOE, timeOfDay, locationID, categoryID, groupSize, comments, review, id], (err, rows, fields) => {
                try {
                    resolve(promiseResult);
                } catch (err) {
                    res.status(400).send({ message: err.message })
                }
            });
        } catch (err){
            reject({ message : err.message });
        }
    });
}

// DELETE doesn't have to work yet
//
exports.delete_entry = async(req, res) => {
    return new Promise((resolve, reject) => {
        try{
            var promiseResult = {}
            promiseResult.req = req
            promiseResult.res = res
            promiseResult.context = context

            var {id} = req.body;
            mysql.pool.query(selectLatestQuery, [id], (err, rows, fields) => {
                try {
                    resolve(promiseResult);
                } catch (err) {
                    res.status(400).send({ message: err.message })
                }
            });
        } catch (err){
            reject({ message: err.message })
        }
    })
}