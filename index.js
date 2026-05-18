require('dotenv').config()

const express = require('express')
const session = require('express-session')
const app = express()

const db = require('./db.js')

const PORT = process.env.SERVER_PORT || 3000


app.set('view engine', 'ejs');

app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false
    })
)

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// -------
// PAGES
// -------

app.get('/', (req, res) => {
    if (checkAuth(req, res)) res.render('index', {})
})
app.get('/login', (req, res) => {
    res.render('login', {})
})
app.get('/students', (req, res) => {
    if (checkAuth(req, res)) res.render('students', {})
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
    console.log(`Server Running on http://localhost:${PORT}`)
})

//--------
// POSTS
//--------

app.post('/authenticate-user', (req, res) => {
    let { email, password } = req.body
    let status = db.authenticate(email, password, res)
}) 

//-----------
// FUNCTIONS
//-----------

function checkAuth(req, res) {
    if (!req.session || !req.session.email) {
        res.redirect('/login')
        return false
    }

    return true
}