let bcrypt = require('bcryptjs')
let dotenv = require('dotenv').config()
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: process.env.DB_HOST_KEY,
    user: process.env.DB_USER_KEY,
    password: process.env.DB_PASSWORD_KEY,
    database: process.env.DB_DATABASE_KEY
})

// Ping the connection to the database every minute to keep it alive
setInterval(() => {
    db.query('SELECT 1', (err) => {
        if (err) {
            console.error('Error pinging database:', err)
        } else {
            console.log('Database connection is alive')
        }
    })
}, 60000) // Ping every minute

// ------------------
//  SYNC API METHODS
// ------------------

function requestStudents(res) {
    let sql = 'SELECT * FROM students LEFT JOIN person ON students.person_id = person.id LIMIT 10;'
        db.query(sql, (err, results) => {
            if (err) return res.status(500).send(err)
            res.json(results)
        })
}

function requestSchedule(res) {
    let sql = 'SELECT * FROM placeholder LEFT JOIN placeholder ON placeholder.person_id = person.id LIMIT 10;'
        db.query(sql, (err, results) => {
            if (err) return res.status(500).send(err)
            res.json(results)
        })
}

function authenticate(email, pwd, callback) {
    let password = db.query(`SELECT password FROM person WHERE email = '${email}'`, (err, results) => {
        if (err) {
            console.log(`error`)
            console.log(err)
        }
        else {
            try {
                if (bcrypt.compareSync(pwd, results[0].password)) {
                    console.log('password match')
                    callback(true)
                }
                else {
                    console.log('passwords dont match')
                    callback(false)
                }
            } catch (TypeError) {
                console.log('user not found')
                callback(false)
            }

        }
    })
}

// ------------------
//  ASYNC API METHODS
// ------------------

async function get_pwd() {
    let query = await getQueryResults(`SELECT password FROM person`)
    return results = query.flatMap(Object.values)
}

async function getQueryResults(sql) {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Error executing query:', err)
                reject(err) // Reject the promise if there's an error
                return
            }
            resolve(results) // Resolve the promise with the results
        })
    })
}

module.exports = { requestStudents, authenticate, get_pwd }