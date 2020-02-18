const debug = require('debug')('adapter-mongo')
const { MongoClient } = require('mongodb')
const { db: dbConfig } = require('../../config')

const { uri, databaseName, collection } = dbConfig.mongo
let db;

const start = () => {
    return new Promise((resolve, reject) => {
        debug(`Starting store at Uri: ${uri}. Database: ${databaseName}. Collection: ${collection}`)
        MongoClient.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            }, (err, client) => {
            
            if (err) {
                debug("Starting ERROR:", error)
                return reject(err)
            };
            
            db = client.db(databaseName)
            resolve()
            debug(`Store has started!`)
        })
    })
}


const getAllQuotes = () => {
    debug("Requesting all quotes....")
    return db.collection(collection).find().toArray()
}

const getQuote = (id) => {
    debug(`Requesting single quote by id: ${id}`)
    return db.collection(collection).findOne({id})
}

const addQuote = (data) => {
    debug(`Adding new Quote: ${JSON.stringify(data)}`)
    return db.collection(collection).insertOne(data)
}

const stop = () => {
    debug("Stopping store....")
    return db.stop()
}

module.exports = {start, getAllQuotes, getQuote, addQuote, stop}