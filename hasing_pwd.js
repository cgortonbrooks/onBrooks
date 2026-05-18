//const bcrpypt = require('bcryptjs')
//const db = require('./db.js')
import db from './db.js'


const saltRounds = 10

let passwords = await db.get_pwd()
for (let i of passwords) {
    console.log(i)
}
