const debug = require('debug')('adapter-postgres')
const initHandyPg = require('handy-postgres');
const { db: dbConfig } = require('../../config')

let pg;

const start = async () => {
    debug("Starting store....")
    const handyPg = initHandyPg({});
    pg = await handyPg.start(dbConfig);
    debug("Store is ready!")
}

const stop = () => {
    debug("Stopping store....")
    return handyPg.stop()
}

const getAllQuotes = async () => {
    debug("Requesting all quotes....")
    const { rows } = await pg.formattedQuery('select-all-quotes');
    return rows;
}

const getQuoteById = async (id) => {
    debug(`Requesting single quote by id: ${id}`)
    const { rows } = await pg.formattedQuery('select-quote', ["id", id]);
    return rows[0];
}

const getQuoteByLegacyId = async (id) => {
    debug(`Requesting single quote by legacy_id: ${id}`)
    const { rows } = await pg.formattedQuery('select-quote', ["legacy_id", id]);
    return rows[0];
}



const addQuote = async (data) => {
    debug(`Adding new Quote: ${JSON.stringify(data)}`)
    const {legacy_id, author, quote} = data
    const { rows } = await pg.formattedQuery('insert-quote', [legacy_id,  author, quote]);
    return rows;
}

module.exports = { start, stop, getAllQuotes, getQuoteById, getQuoteByLegacyId, addQuote };
