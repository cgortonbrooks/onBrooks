const express = require('express')
const mysql = require('mysql2')
const app = express()
const PORT = 3000

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

const db = mysql.createConnection({
    host: '66.198.240.46',
    user: 'bfzhiwes_onbrooks_user',
    password: 'hh23f7vhbrh1gnil',
    database: 'bfzhiwes_onbrooks'
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`)
})