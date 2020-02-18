const debug = require('debug')('seed-migration-process')
const stores = require('./stores');

(async () => {
    debug("Migration process has started...")
    const { oldDb, newDb } = await stores()
    const originalQuotes = await oldDb.getAllQuotes()
    debug(`Expected Quotes to migrate ${originalQuotes.length}`)
    for(let i= 0; i < originalQuotes.length; i++){
      const currentQuote = originalQuotes[i]
      const {author, quote, _id} = currentQuote
      debug("CURRENT:", currentQuote)
      await newDb.addQuote({legacy_id: _id.toString(), author, quote})
      debug(`New quote migrated to new DB: ${_id}`)
    }
    const migratesQuotes = await newDb.getAllQuotes() || 0;
    debug(`Migrated: ${migratesQuotes.length}. Original: ${originalQuotes.length}`)
    debug("Migration process has ended!")
    process.exit(0)
 })()
 