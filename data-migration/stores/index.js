const mongo = require('./adapters/mongo')
const postgres = require('./adapters/postgres')
const debug = require('debug')('store')


const start = async () => await Promise.all([mongo.start(), postgres.start()])

const stop = async () => await Promise.all([mongo.stop(), postgres.stop()])

const exit = () => {
    debug("Process exit now!")
    process.exit();
}

const newDb = {
    getAllQuotes: postgres.getAllQuotes, 
    getQuote: postgres.getQuote, 
    addQuote: postgres.addQuote
};

const oldDb = {
    getAllQuotes: mongo.getAllQuotes, 
    getQuote: mongo.getQuote, 
    addQuote: mongo.addQuote
};

const exitEvents = ['SIGINT', 'SIGTERM', 'exit', 'uncaughtException']


exitEvents.forEach(event => {
    debug(`Register graceful shutdown for system event: ${event}`)
    process.on(event, async () => {
        debug(`Stopping stores due event: ${event}`)
        await stop()
        exit()
    });
})

module.exports = async () => {
    debug("Starting stores....")
    try {
        await start()
        debug("Stores are ready!")
    } catch (err) {
        throw err
    }

    return { oldDb, newDb }
}