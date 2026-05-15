let doc = document.getElementById('studentTable')

fetch('/api/students').then(res => res.json()).then(students => buildTable(students)) // https://www.youtube.com/watch?v=2DVbW0Szqh0

function buildTable(students) {
    console.log(students)
    for (let student of students) {
        line = document.createElement('tl')
        line.innerHTML = JSON.stringify(student)
        doc.insertAdjacentElement('beforeend', line)
    }
}