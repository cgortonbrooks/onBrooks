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

module.exports = { // https://stackoverflow.com/questions/5797852/how-do-i-include-functions-from-my-other-files
    requestStudents: function (res) {
        let sql = 'SELECT * FROM students LEFT JOIN person ON students.person_id = person.id LIMIT 10;'
        db.query(sql, (err, results) => {
            if (err) return res.status(500).send(err)
            res.json(results)
        })
    }
}