const debug = require('debug')('seed-generation')
const faker = require('faker');
const { seeds } = require('./config')
const stores = require('./stores');

const totalQuotes = async (oldDb, newDb) => {
    const totalOldDb = await oldDb.getAllQuotes()
    debug(`Current Quotes in oldDb: ${totalOldDb.length || 0}`)
    const totalNewDb = await newDb.getAllQuotes()
    debug(`Current Quotes in oldDb: ${totalNewDb.length || 0}`)
}

const quoteContent = () => {
    return {
        author: faker.name.findName(),
        quote: faker.company.catchPhrase()
    }
}

(async () => {
   debug("Process has started...")
   const { oldDb, newDb } = await stores()
   debug(`Expected Quotes to generate ${seeds.total}`)
   await totalQuotes(oldDb, newDb)
   for(let i= 0; i < seeds.total; i++){
     const {author, quote} = quoteContent()
     await oldDb.addQuote({author, quote})
     debug(`New quote added to Old DB: ${quote} by ${author}`)
   }
   await totalQuotes(oldDb, newDb)
   debug("Process has ended!")
   process.exit(0)
})()

