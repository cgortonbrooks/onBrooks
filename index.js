const express = require('express')
const mysql = require('mysql2')
const app = express()
const PORT = 3000

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

const db = mysql.createConnection({
    host: '66.198.240.46',
    user: 'bfzhiwes_onbrooks_user',
    password: 'hh23f7vhbrh1gnil',
    database: 'bfzhiwes_onbrooks'
})

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
    let sql = 'SELECT * FROM students LIMIT 10'
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err)
        
        let students = res.json(results)
        res.send(students)
    })
})

// -------
// LISTEN
// -------

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}/students`)
})
