// Remember, if something doesn't seem to be working, just fix it (or npm install). ~ Kaden

require('dotenv').config()

const express = require('express')
const session = require('express-session')
const db = require('./db.js')
const schedule = require('./serverschedule.js')

const app = express()

const PORT = process.env.SERVER_PORT || 3000
const DEV_MODE = process.env.DEV_MODE === 'true'
const DEV_MODE_DEFAULT_EMAIL = process.env.DEV_MODE_DEFAULT_EMAIL
const DEV_MODE_DEFAULT_PASSWORD = process.env.DEV_MODE_DEFAULT_PASSWORD


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

app.use((req, res, next) => {
    if (!DEV_MODE || req.session?.email) {
        return next()
    }

    req.session.email = DEV_MODE_DEFAULT_EMAIL
    req.session.devModeAutoLogin = true
    next()
})

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// -------
// PAGES
// -------

app.get('/', (req, res) => {
    checkAuth(req, res, 'dashboard')
})
app.get('/login', (req, res) => {
    if (req.session && req.session.email) res.redirect('/')
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
app.get('/classes', (req, res) => {
    checkAuth(req, res, 'classes')
})

// -------------
// API REQUESTS
// -------------

app.get('/api/students', (req, res) => {
    db.requestStudents(res)
})
app.get('/api/schedule', (req, res) => {
    let sortedState = req.query.sorted === 'false' ? false : true
    if (!sortedState) {
        schedule.getStudentClasses(res, req.session.email, sortedState)
    } else {
        schedule.getStudentClasses(res, req.session.email)
    }    
})
app.get('/api/class', (req, res) => {
    let query = req.query.class
    db.getClassInfo(query, res)
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
    if (DEV_MODE && email === DEV_MODE_DEFAULT_EMAIL && password === DEV_MODE_DEFAULT_PASSWORD) {
        return reauth(req, res, true, email)
    }
    db.authenticate(email, password, (status) => reauth(req, res, status, email))
})

//-----------
// FUNCTIONS
//-----------

function checkAuth(req, res, link) {
    if (!req.session || !req.session.email) {
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

        res.redirect('/dashboard')
    } else {
        res.redirect('/login?error=failedAuth')
    }
}
