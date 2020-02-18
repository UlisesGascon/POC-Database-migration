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
    urls: {
        oldBaseUrl: "http://localhost:8081",
        newBaseUrl: "http://localhost:8080"
    },
    seeds: {
        total: 100
    }
}