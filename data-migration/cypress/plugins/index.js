let oldDb;

(async () => {
  const stores = require('../../stores/index');
  ({ oldDb } = await stores())
})()

module.exports = (on) => {
  on('task', {
     legacyQuotes () {
       return oldDb.getAllQuotes()
    }
  })
}