const util = require('util')
var mysql = require('mysql');
var pool = mysql.createPool({
  connectTimeout  : 60*60*1000,
  acquireTimeout  : 60*60*1000,
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_kiblerke',
  password        : '0r3g0n()5t4t',
  database        : 'cs340_kiblerke'
});

// Promisify for Node.js async/await
pool.query = util.promisify(pool.query)

module.exports.pool = pool;