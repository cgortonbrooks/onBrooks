const mysql = require('mysql2')

const db = mysql.createConnection({
    host: '66.198.240.46',
    user: 'bfzhiwes_onbrooks_user',
    password: 'hh23f7vhbrh1gnil',
    database: 'bfzhiwes_onbrooks'
})

module.exports = { // https://stackoverflow.com/questions/5797852/how-do-i-include-functions-from-my-other-files
    requestStudents: function (res) {
        let sql = 'SELECT * FROM students LIMIT 10'
        db.query(sql, (err, results) => {
            if (err) return res.status(500).send(err)

            /*let students = res.json(results)
            res.send(students)*/
            res.json(results)
        })
    }
}