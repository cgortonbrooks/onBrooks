let navBar = document.getElementById('navBar')

fetch('/api/schedule').then(res => res.json()).then(classes => buildNav(classes))

function buildNav(classes) {
    console.log(classes)

    for (let c of classes) {
        // let row = document.createElement('tr')
        // doc.insertAdjacentElement('beforeend', row)

        // addLine(student.fname, row)
        // addLine(student.lname, row)
        // addLine(student.form, row)
        // addLine(student.gpa, row)
        // addLine(student['boarding/day'], row)
    }
}
