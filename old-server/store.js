const { MongoClient } = require('mongodb')
const quotesSeeds = require('./data_seeds.json')

let db;
const mongoDbUri = process.env.MONGO_URI
const mongoDbName = process.env.MONGO_DB_NAME

const runSeeds = process.env.SEEDS
const collection = process.env.MONGO_DB_COLLECTION

const startDb = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongoDbUri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            }, (err, client) => {
            
                if (err) reject(err);
            
            db = client.db(mongoDbName)
        
            if(runSeeds){
                return db.collection(collection).insertMany(quotesSeeds, error => {
                    error ? reject(error) : resolve();
                });
            }
        
            resolve()
          })
    })
}

const getAllQuotes = () => {
    return new Promise((resolve, reject) => {
        db.collection(collection).find().toArray((err, data) => {
            err ? reject(err) : resolve(data) 
        })
    })
}

module.exports = {startDb, getAllQuotes}