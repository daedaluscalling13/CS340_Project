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

module.exports.pool = pool;