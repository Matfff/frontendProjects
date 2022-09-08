const textEl = document.getElementById('text')
const speedEl = document.getElementById('speed')
const text = 'We Love Programming!'
let idx = 1
let speed = 300 / speedEl.value

writeText()

function writeText() {
    // slice(start,end)：方法可从已有数组中返回选定的元素，返回一个新数组，包含从start到end（不包含end）的数组元素。
    textEl.innerText = text.slice(0, idx)

    idx++

    if (idx > text.length) {
        idx = 1
    }
    
    setTimeout(writeText, speed)
}



// e.target.value获取的就是你选择接受事件的元素输入的或者选择的值。
speedEl.addEventListener('input', (e) => speed = 300 / e.target.value)