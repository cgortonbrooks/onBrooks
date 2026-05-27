let page = document.getElementById('content')

fetch('/api/class').then(res => res.json()).then(i => console.log(i[0].name))

//function buildPage(info)