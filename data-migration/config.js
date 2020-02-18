module.exports = {
    db: {
        mongo: {
            uri: "mongodb://localhost",
            databaseName: "quotes",
            collection: "quotes"
        },
        pg: {
            host: "localhost",
            port: 5432,
            password: 'password',
            database: 'postgres',
            user: 'postgres',
            max: 10,
            idleTimeoutMillis: 30000,
            sql: 'sql/queries',
            ssl: false
        }
    },
    seeds: {
        total: 100
    }
}