let page = document.getElementById('content')
const params = new URLSearchParams(window.location.search);
const classId = params.get('class');

fetch(`/api/class?class=${classId}`).then(res => res.json()).then(i => buildPage(i))

function buildPage(info) {
    let header = document.getElementById('title')
    let general = document.getElementById('info')

    header.innerHTML = info[0].name
    general.innerHTML = `${info[0].teacher_id} | Class ID ${info[0].classID} | Room ${info[0].room} | Block ${info[0].section}` 
}