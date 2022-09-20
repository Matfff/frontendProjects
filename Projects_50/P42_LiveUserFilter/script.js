const result = document.getElementById('result')
const filter = document.getElementById('filter')
const listItems = []

getData()

filter.addEventListener('input', (e) => filterData(e.target.value))

async function getData() {
    const res = await fetch('https://randomuser.me/api?results=50')

    const { results } = await res.json()

    // Clear result
    result.innerHTML = ''

    results.forEach(user => {
        const li = document.createElement('li')

        listItems.push(li)

        li.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first}">
            <div class="user-info">
                <h4>${user.name.first} ${user.name.last}</h4>
                <p>${user.location.city}, ${user.location.country}</p>
            </div>
        `

        result.appendChild(li)
    })
}

function filterData(searchTerm) {
    listItems.forEach(item => {
        // includes() 方法用于判断字符串是否包含指定的子字符串  如果找到匹配的字符串则返回 true，否则返回 false
        if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
            item.classList.remove('hide')
        } else {
            // 隐藏不符合的 li
            item.classList.add('hide')
        }
    })
}