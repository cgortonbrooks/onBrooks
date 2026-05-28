let navBar = document.getElementById('navBar')

fetch('/api/schedule?sorted=false').then(res => res.json()).then(classes => buildNav(classes))

async function buildNav(classes) {
    for (let c of classes) {
        let className = await getClassName(c)
        const ul = document.getElementById('classes-dropdown')
        const li = document.createElement('li')
        const a = document.createElement('a')

        a.className = 'dropdown-item'
        a.href = `/classes?class=${c}`
        a.textContent = className

        li.appendChild(a)
        ul.appendChild(li)
    }
}

async function getClassName(classID) {
    let classes = await fetch(`/api/class?class=${classID}`).then(res => res.json())
    let result = classes[0].name
    return result
}