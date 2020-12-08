const mysql = require('../../dbcon.js')

//---------------------------------------Query Definitions---------------------------------
// Query to populate the home page
const selectLatestQuery = `SELECT * FROM travelEntries
    JOIN locations ON travelEntries.locationID = locations.locationID
    LEFT JOIN categories ON travelEntries.categoryID = categories.categoryID
    WHERE entryID>=((SELECT MAX(entryID) FROM travelEntries)-5)
    ORDER BY entryID DESC`

// Query to populate entry page
const selectAllQuery = `SELECT * FROM travelEntries
    JOIN locations ON travelEntries.locationID = locations.locationID
    LEFT JOIN categories ON travelEntries.categoryID = categories.categoryID
    ORDER BY entryID ASC`

// Query to populate the results page
const selectSearchQuery = `SELECT * FROM travelEntries
    JOIN
    (SELECT * FROM travelEntries_locations
    JOIN locations ON travelEntries.lid = locations.locationID
    WHERE locations.name =?)
    ON travelEntries.entryID = travelEntries_location.tid`

// Query to populate the edit TravelEntry page
const selectEditQuery = `SELECT *, DATE_FORMAT(DOE, '%Y-%m-%d') AS custom_date FROM travelEntries
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
userID=?,
DOE=?,
timeOfDay=?,
locationID=?,
categoryID=?,
title=?,
comments=?,
review=?,
groupSize=?
WHERE entryID=?`

// Query to delete a TravelEntry from the home page
// TODO: Add a confirmation before deleting?
const deleteEntryQuery = `DELETE FROM travelEntries WHERE entryID=?`


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
// All entries
exports.get_all_entries = async(req, res, context) => {
    return new Promise((resolve, reject)=>{
        try{
            var promiseResult = {}
            promiseResult.res = res
            promiseResult.context = context

            mysql.pool.query(selectAllQuery, (err, rows, fields) => {
                try {
                    console.log(rows)
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
//
exports.select_edit_entry = async(req, res, context) => {
    return new Promise((resolve, reject) => {
        try{
            var promiseResult = {}
            promiseResult.req = req
            promiseResult.res = res
            promiseResult.context = context
            
            var {entryID} = req.query
            
            mysql.pool.query(selectEditQuery, [entryID], (err, rows, fields) => {
                try {
                    promiseResult.context.entry = rows[0]
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
            mysql.pool.query(insertEntryQuery, [userID, DOE, timeOfDay, locationID, categoryID, title, comments, review, groupSize], (err, rows, fields) => {
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

// UPDATE
exports.update_entry = async(req, res, context) => {
    return new Promise((resolve, reject) =>{
        try{
            var promiseResult = {}
            promiseResult.req = req
            promiseResult.res = res
            promiseResult.context = context

            var {entryID, userID, title, DOE, timeOfDay, locationID, categoryID, comments, review, groupSize} = req.body;
            mysql.pool.query(updateEntryQuery, [userID, DOE, timeOfDay, locationID, categoryID, title, comments, review, groupSize, entryID], (err, rows, fields) => {
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

// DELETE
//
exports.delete_entry = async(req, res, context) => {
    return new Promise((resolve, reject) => {
        try{
            var promiseResult = {}
            promiseResult.req = req
            promiseResult.res = res
            promiseResult.context = context

            var {entryID} = req.body;
            mysql.pool.query(deleteEntryQuery, [entryID], (err, rows, fields) => {
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