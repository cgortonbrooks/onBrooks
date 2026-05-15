const mysql = require('mysql2')

const db = mysql.createConnection({
    host: '66.198.240.46',
    user: 'bfzhiwes_onbrooks_user',
    password: 'hh23f7vhbrh1gnil',
    database: 'bfzhiwes_onbrooks'
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

            /*let students = res.json(results)
            res.send(students)*/
            res.json(results)
        })
    }
}