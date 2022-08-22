const tagsEl = document.getElementById('tags')
const textarea = document.getElementById('textarea')

textarea.focus()

textarea.addEventListener('keyup', (e) => {
    //定义
    // target 事件属性可返回事件的目标节点（触发该事件的节点），如生成事件的元素
    // 获取当前操作的事件源
    //语法
    // event.target
    createTags(e.target.value)

    if (e.key === 'Enter') {
        setTimeout(() => {
            e.target.value = ''
        }, 10)

        randomSelect()
    }
})

function createTags(input) {
    // trim() 方法用于删除字符串的头尾空白符，空白符包括：空格、制表符 tab、换行符等其他空白符等。
    // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。  filter() 不会对空数组进行检测；不会改变原始数组
    // map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim())

    tagsEl.innerHTML = ''

    tags.forEach(tag => {
        const tagEl = document.createElement('span')
        tagEl.classList.add('tag')
        tagEl.innerText = tag
        // appendChild() 方法可向节点的子节点列表的末尾添加新的子节点。   添加span
        tagsEl.appendChild(tagEl)
    })
}

function randomSelect() {
    const times = 30

    // setInterval 定时调用，每隔一段时间执行一次
    const interval = setInterval(() => {
        const randomTag = pickRandomTag()

        if (randomTag !== undefined) {
            highlightTag(randomTag)

            setTimeout(() => {
                unHighlightTag(randomTag)
            }, 100)
        }
    }, 100);

    // setTimeout()方法用于在指定毫秒数后再调用函数或者计算表达式（以毫秒为单位）
    setTimeout(() => {
        clearInterval(interval)
        
        setTimeout(() => {
            const randomTag = pickRandomTag()

            highlightTag(randomTag)
        }, 100)

    }, times * 100)
}

// 随机选标签
function pickRandomTag() {
    const tags = document.querySelectorAll('.tag')
    // Math.floor() 向下取整
    // 返回 tags[0 到 tags.length - 1的随机整数]  
    return tags[Math.floor(Math.random() * tags.length)]
}

// 被选中的标签
function highlightTag(tag) {
    tag.classList.add('highlight')
}

// 没有被选中的标签
function unHighlightTag(tag) {
    tag.classList.remove('highlight')
}