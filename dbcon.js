var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'mysql.eecs.oregonstate.edu',
  user            : 'cs340_kiblerke',
  password        : '8000',
  database        : 'cs340_kiblerke'
});

module.exports.pool = pool;
