let doc = document.getElementById('studentTable')

fetch('/api/students').then(res => res.json()).then(students => buildTable(students))

function buildTable(students) {
    console.log(students)

    for (let student of students) {
        let row = document.createElement('tr')
        doc.insertAdjacentElement('beforeend', row)

        addLine(student.fname, row)
        addLine(student.lname, row)
        addLine(student.form, row)
        addLine(student.gpa, row)
        addLine(student['boarding/day'], row)
    }
}

function addLine(stud, row) {
    let line = document.createElement('td')
    line.innerHTML = stud
    row.insertAdjacentElement('beforeend', line)
}