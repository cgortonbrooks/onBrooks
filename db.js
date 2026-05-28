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

async function getClassInfo(classID, res) {
    try {
        let sql = `SELECT * FROM sections WHERE sections.classID='${classID}'`
        let query = await getQueryResults(sql)
        //console.log(query)
        res.json(query)
    } catch (error) {
        console.error('Error in getClassInfo:', error)
        res.status(500).send(error)
    }
}

async function getClassInfoRaw(classID) {
    try {
        let sql = `SELECT * FROM sections WHERE sections.classID='${classID}'`
        let query = await getQueryResults(sql)
        return query[0]
    } catch (error) {
        console.error('Error in getClassInfoRaw:', error)
        return null
    }
}

async function requestSchedule(res, student_email) {
    try {
        let sql = `SELECT roster.class_id FROM roster, person, students WHERE roster.student_id=students.student_id AND students.person_id=person.id AND person.email='${student_email}'`
        let results = await getQueryResults(sql, student_email)
        //res.json(results)
        return results
    } catch (error) {
        console.error('Error in requestSchedule:', error)
        res.status(500).send(error)
    }
}

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
    } catch (error) {
        console.log('Error in authenticate:', error)
        console.log(error)
    }
}

async function requestStudents(res) {
    try {
        let sql = 'SELECT * FROM students LEFT JOIN person ON students.person_id = person.id LIMIT 10;'
        let results = await getQueryResults(sql)
        res.json(results)
    } catch (error) {
        console.log('Error in requestStudents:', error)
        res.status(500).send(error)
    }
}

async function requestClasses(res) {
    try {
        let sql = 'SELECT DISTINCT roster.class_id, sections.name FROM roster LEFT JOIN sections ON roster.class_id = sections.classID'
        let results = await getQueryResults(sql)
        res.json(results)
    } catch (error) {
        console.log('Error in requestClasses:', error)
        res.status(500).send(error)
    }
}

async function getQueryResults(sql) {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Error executing query:', err)
                reject(err)
                return
            }
            resolve(results)
        })
    })
}

module.exports = { requestStudents, authenticate, requestSchedule, getClassInfo, getClassInfoRaw, requestClasses }