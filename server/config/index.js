require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3100,
  domain: `http://localhost:${process.env.PORT}`,
  dbURL: process.env.DATABASE_URI,
  dbOptions: {
    useMongoClient: true,
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 10,
  },
};