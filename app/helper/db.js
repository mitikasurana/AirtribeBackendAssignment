const mysql = require('mysql2/promise');
const config = require('./config');

async function query(sql, params) {
  // console.log(config.db);
  const connection = await mysql.createConnection(config.db);
  console.log(sql);
  const [results] = await connection.execute(sql, params);

  return results;
}

module.exports = {
  query
  // conn
}