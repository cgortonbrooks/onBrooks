let doc = document.getElementById('scheduleTable')
const blocksEachDay = {
    'monday': ['A', 'B', 'C', 'D', 'E'],
    'tuesday': ['B', 'C', 'D', 'E', 'A'],
    'wednesday': ['C', 'D', 'E', 'A', 'B'],
    'thursday': ['D', 'E', 'A', 'B', 'C'],
    'friday': ['E', 'A', 'B', 'C', 'D'],
    'saturday': ['A', 'B', 'C', 'D', 'E']
}

fetch('/api/schedule').then(res => res.json()).then(schedule => buildTable(schedule)) // https://www.youtube.com/watch?v=2DVbW0Szqh0

function buildTable(schedule) {
    console.log(schedule)

    for (let thing of schedule) {
        let row = document.createElement('tr')
        doc.insertAdjacentElement('beforeend', row) 

        addLine(thing.block, row)
        addLine(thing.class, row)
        addLine(thing.teacher, row) 
    }
}

function addLine(stud, row) {
    line = document.createElement('td')
    line.innerHTML = stud // JSON.stringify(student)
    row.insertAdjacentElement('beforeend', line) // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
    console.log('insert', line)
}