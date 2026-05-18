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

// -------------
//  API METHODS
// -------------

function requestStudents(res) {
    let sql = 'SELECT * FROM students LEFT JOIN person ON students.person_id = person.id LIMIT 10;'
        db.query(sql, (err, results) => {
            if (err) return res.status(500).send(err)
            res.json(results)
        })
}

function authenticate(email, pwd, res) {
    let password = db.query(`SELECT password FROM person WHERE email = '${email}'`, (err, results) => {
        if (err) {
            console.log(`error`)
            console.log(err)
        }
        else {
            try {
                if (pwd == results[0].password) {
                    console.log('password match')
                    res.redirect('/students')
                    return "hi"
                }
                else {
                    console.log('passwords dont match')
                    res.redirect('/login')
                }
            } catch (TypeError) {
                console.log('user not found')
                res.redirect('/login')
            }

        }
    })
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

module.exports = { requestStudents, authenticate, get_pwd }