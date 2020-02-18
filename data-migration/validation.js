const logger = require('./logger')
const stores = require('./stores');


const compareQuotes = (src={}, srcProps=[], dest={}, destProps=[]) => {
    srcProps.forEach((prop, i) => {
        if(src[prop] === dest[destProps[i]]){
            logger.info(`Quote prop ${prop} for ${src.id} was migrated successfully`)
        } else {
            logger.info(`Quote prop ${prop} for ${src.id} wasn't migrated successfully`)
        }
    })
}

(async () => {
    logger.info("Migration process has started...")
    logger.info("Migration details for Quotes data")
    logger.info("Should match total quotes")

    const { oldDb, newDb } = await stores()
    const originalQuotes = await oldDb.getAllQuotes()
    const migratedQuotes = await newDb.getAllQuotes()
    
    logger.info(`Original quotes ${originalQuotes.length}`)
    logger.info(`Migrated quotes ${migratedQuotes.length}`)
    if(!originalQuotes.length) logger.error("Original quotes are 0!")
    if(!migratedQuotes.length) logger.error("Migrated quotes are 0!")

    if(originalQuotes.length === migratedQuotes.length) {
        logger.info(`MATCH for Original quotes: ${originalQuotes.length} and migrated quotes: ${migratedQuotes.length}`)
    } else {
        logger.error(`NO MATCH for quotes. Migrated: ${migratedQuotes.length}. Original: ${originalQuotes.length}`)
    } 

    logger.info(`Expected Quotes to have been migrated ${originalQuotes.length}`)


    for(let i= 0; i < originalQuotes.length; i++){
        const {_id, name, author} = originalQuotes[i]
        const originalQuote = {id: _id.toString(), name, author} 
        logger.info(`Validations for Quote migrated original id: ${originalQuote.id} has started`)

        const storedQuote = await newDb.getQuoteByLegacyId(originalQuote.id);
        if(!storedQuote) {
            logger.error(`Quote ${originalQuote.id} was not migrated`)
        } else {
            logger.info(`Quote ${originalQuote.id} exists in DB`)
            compareQuotes(originalQuote, ["id", "name", "author"], storedQuote, ["legacy_id", "name", "author"]) 
        }

        logger.info(`Validations for Quote migrated original id: ${originalQuote.id} has ended`)
    }
    logger.info("Migration process has ended!")
    process.exit(0)
 })()
