const db = require('./db.js')
const express = require('express')
const app = express()
const PORT = 3000

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

// -------
// PAGES
// -------

app.get('/', (req, res) => {
    res.render('index', {})
})
app.get('/login', (req, res) => {
    res.render('login', {})
})
app.get('/students', (req, res) => {
    res.render('students', {})
})

// -------------
// API REQUESTS
// -------------

app.get('/api/students', (req, res) => {
    db.requestStudents(res)
})

// -------
// LISTEN
// -------

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}/students`)
})
