const fill = document.querySelector('.fill')
const empties = document.querySelectorAll('.empty')

// 拖拽事件
fill.addEventListener('dragstart', dragStart)
fill.addEventListener('dragend', dragEnd)

// for in循环遍历的是数组的键值(索引)，  for of循环遍历的是数组的值。
for (const empty of empties) {
    // DragDrop：拖放完成，也就是鼠标拖入对象并在拖放区域释放。
    // DragEnter：拖放进入，也就是鼠标拖放对象进入拖放区域。
    // DragLeave：离开拖放区域。
    // DragOver：拖放对象悬浮于拖放区域，在拖放区域内移动时多次触发。
    empty.addEventListener('dragover', dragOver)
    empty.addEventListener('dragenter', dragEnter)
    empty.addEventListener('dragleave', dragLeave)
    empty.addEventListener('drop', dragDrop)
}

function dragStart() {
    this.className += ' hold'
    // invisible 的作用， 将 empty 里面样式清空  等效于  this.className = ''
    setTimeout(() => this.className = 'invisible', 0)
}

function dragEnd() {
    this.className = 'fill'
}

function dragOver(e) {
    // 阻止默认事件
    e.preventDefault()
}

function dragEnter(e) {
    e.preventDefault()
    this.className += ' hovered'
}

function dragLeave() {
    this.className = 'empty'
}

function dragDrop() {
    this.className = 'empty'
    this.append(fill)
}