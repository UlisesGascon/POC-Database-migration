const express = require('express')
const {startDb, getAllQuotes} = require('./store')
const app = express()

const port = process.env.PORT

// Middleware
app.set('view engine', 'ejs')

// Routes
app.get('/quotes', (req, res) => {
    getAllQuotes()
    .then(quotes => {
        res.render('quotes.ejs', { quotes })
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