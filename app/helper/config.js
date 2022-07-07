const dotenv=require('dotenv').config();

const config = {
    db: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,      
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PWD
    },
    server: {
        port: 3000,
        host: '127.0.0.1'
    }
  };
module.exports = config;