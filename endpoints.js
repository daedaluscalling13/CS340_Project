// const express = require('express')
// const mysql = require('./dbcon.js')
// const index = require('./index')
// const pool = index.pool

// const getEntries = async (request, response) => {
//     pool.query('SELECT * FROM travelEntries', (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).json(results.rows)
//     })
//   }

// const createEntry = async (request, response) => {
//     console.log(request.body)

//   const { userID, locationID, categoryID, title, comments, review, groupSize } = request.body
//   pool.query('SELECT * FROM addTravelEntry($1, $2, $3, $4, $5, $6, $7)', 
//     [userID, locationID, categoryID, title, comments, review, groupSize], 
//   (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(201).json({response: `Entry added with ID: ${results.rows}`})
//   })
// }

// exports.getEntries = getEntries
// exports.createEntry = createEntry

