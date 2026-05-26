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
//  ASYNC API METHODS
// ------------------

async function authenticate(email, pwd, callback) {
    try {
        let sql = `SELECT password FROM person WHERE email = '${email}'`
        let password = await getQueryResults(sql)
        try {
            if (bcrypt.compareSync(pwd, password[0].password)) {
                callback(true)
            }
            else {
                callback(false)
            }
        } catch (TypeError) {
            callback(false)
        }
    } catch (err) {
        console.log('Error in authenticate:', err)
        console.log(err)
    }
}

async function requestStudents(res) {
    try {
        let sql = 'SELECT * FROM students LEFT JOIN person ON students.person_id = person.id LIMIT 10;'
        let results = await getQueryResults(sql)
        res.json(results)
    } catch (error) {
        console.log('Error in requestStudents:', err)
        res.status(500).send(err)
    }
}

async function requestSchedule(res, student_email) {
    try {
        let sql = `SELECT roster.class_id FROM roster, person, students WHERE roster.student_id=students.student_id AND students.person_id=person.id AND person.email='${student_email}'`
        let results = await getQueryResults(sql, student_email)
        //res.json(results)
        return results
    } catch (err) {
        console.error('Error in requestSchedule:', err)
        res.status(500).send(err)
    }
}

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

module.exports = { requestStudents, authenticate, get_pwd, requestSchedule }