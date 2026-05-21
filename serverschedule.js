// 1. Know the day
// 2. Query database for the student's classes
// 3. Order classes based on given schedule by day
// 4. Serve information to client

const db = require('./db.js')
const blocksEachDay = {
    'monday': ['A', 'B', 'C', 'D', 'E'],
    'tuesday': ['B', 'C', 'D', 'E', 'A'],
    'wednesday': ['C', 'D', 'E', 'A', 'B'],
    'thursday': ['D', 'E', 'A', 'B', 'C'],
    'friday': ['E', 'A', 'B', 'C', 'D'],
    'saturday': ['A', 'B', 'C', 'D', 'E']
}

async function getStudentClasses(res, email) {
    let day = new Date()
    let today = day.toLocaleDateString('en-US', {weekday: 'long'}).toLowerCase()
    let classes = await db.requestSchedule(res, email)
    let studentSchedule = []
    let sortedSchedule = []
    for (let i of classes) {
        studentSchedule.push(i.class_id)
    }
    for (let i of blocksEachDay[today]) {
        for (let j of studentSchedule) {
            if (i == j.at(-1)) {
                sortedSchedule.push(j)
            }
        }
    }
    res.json(sortedSchedule)
}

module.exports = { getStudentClasses }