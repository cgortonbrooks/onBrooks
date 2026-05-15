let doc = document.getElementById('studentTable')

fetch('/api/students').then(res => res.json()).then(students => buildTable(students)) // https://www.youtube.com/watch?v=2DVbW0Szqh0

function buildTable(students) {
    console.log(students)

    for (let student of students) {
        let row = document.createElement('tr')
        doc.insertAdjacentElement('beforeend', row) 

        addLine(student.form, row)
        addLine(student.gpa, row)     
    }
}

function addLine(stud, row) {
    line = document.createElement('tl')
    line.innerHTML = stud // JSON.stringify(student)
    row.insertAdjacentElement('beforeend', line) // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
    console.log('insert')
}