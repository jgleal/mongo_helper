require('dotenv').config()
const MongoClient = require('mongodb').MongoClient

const DB_NAME = process.env.DATABASE_NAME
const COLLECTION_NAME = process.env.COLLECTION_NAME

const CONNECTION_STRING = process.env.CONNECTION_STRING
const mongoConnection = new MongoClient(
  CONNECTION_STRING,
  {
    useUnifiedTopology: true
  })

module.exports = { mongoConnection, DB_NAME, COLLECTION_NAME }
