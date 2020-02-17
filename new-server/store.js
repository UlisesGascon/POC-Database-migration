const initHandyPg = require('handy-postgres');

const user = process.env.POSTGRES_USER || 'postgres'
const database = process.env.POSTGRES_DB || 'postgres'
const password = process.env.POSTGRES_PASSWORD || 'password'
const host = process.env.POSTGRES_HOST || 'localhost'
const port = process.env.POSTGRES_PORT || 5432
const runSeeds = process.env.SEED

const config = {
    pg:{
        user,
        database,
        password,
        host,
        port,
        max: 10,
        migrations: [{ directory: 'sql/migrations', filter: '\\.sql$' }],
        idleTimeoutMillis: 30000,
        sql: 'sql/queries',
        ssl: process.env.POSTGRES_SSL || false,
    }
}

let pg;

const start = async () => {
    const handyPg = initHandyPg({});
    pg = await handyPg.start(config);

    if(runSeeds) {
        await pg.formattedQuery('insert-mocked-data');
    }
}

const stop = () => handyPg.stop()

const getAllQuotes = async () => {
    const { rows } = await pg.formattedQuery('select-all-quotes');
    return rows;
}

module.exports = { start, stop, getAllQuotes };
