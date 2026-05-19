require('dotenv').config()

const express = require('express')
const session = require('express-session')
const app = express()

const db = require('./db.js')

const PORT = process.env.SERVER_PORT || 3000
const DEV_MODE = process.env.DEV_MODE


app.set('view engine', 'ejs');

app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 60000 * 30}, // 30 minutes until expiration (WILL NEED TO CHANGE BASED ON CHECKED REMEMBER ME BOX)
        rolling: true
    })
)

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// -------
// PAGES
// -------

app.get('/', (req, res) => {
    checkAuth(req, res, 'index')
})
app.get('/login', (req, res) => {
    if (req.session && req.session.email && !(process.env.DEV_MODE == 'true')) res.redirect('/')
    else res.render('login', {})
})
app.get('/students', (req, res) => {
    checkAuth(req, res, 'students')
})
app.get('/dashboard', (req, res) => {
    checkAuth(req, res, 'dashboard')
})
app.get('/schedule', (req, res) => {
    checkAuth(req, res, 'schedule')
})

// -------------
// API REQUESTS
// -------------

app.get('/api/students', (req, res) => {
    db.requestStudents(res)
})
app.get('/api/schedule', (req, res) => {
    db.requestSchedule(res)
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
    db.authenticate(email, password, (status) => reauth(req, res, status, email))
})

//-----------
// FUNCTIONS
//-----------

function checkAuth(req, res, link) {
    if (!(process.env.DEV_MODE == 'true') && (!req.session || !req.session.email)) {
        res.redirect('/login')
    } else {
        res.render(link, {})
    }
}

function reauth(req, res, status, email) {
    if (status) {
        req.session.email = email
        req.session.save((err) => {
            if (err) {
                return res.status(500).send('Session save failed');
            }
        });

        res.redirect('/students')
    } else {
        res.redirect('/login')
    }
}