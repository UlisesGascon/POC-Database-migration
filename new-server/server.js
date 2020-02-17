const express = require('express')
const {start: startDb, getAllQuotes} = require('./store')
const app = express()

const port = process.env.PORT

// Middleware
app.use(express.static('public'))

// Routes
app.get('/api/v1/quotes', (req, res) => {
    getAllQuotes()
    .then(quotes => {
        res.json(quotes)
    })
    .catch(err => {
        res.status(500).send(`DB ERROR: ${err}`)
    })
  });

// Connection
  startDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`listening on ${port}`)
        })
    })
    .catch(err => {
        throw err
    })