import db from './db.js'
import bcrypt from 'bcryptjs'
const saltRounds = 10
const salt = await bcrypt.genSalt(saltRounds)
let fullHash = []
async function hashPwd() {
    let passwords = await db.get_pwd()
    for (let i of passwords) {
        console.log(i)
        fullHash.push(await bcrypt.hash(i, salt))
    }
    console.log(fullHash)
}
hashPwd()
