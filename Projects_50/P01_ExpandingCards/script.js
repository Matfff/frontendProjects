const panels = document.querySelectorAll('.panel')

// foreach方法主要是针对数组而言的，对数组中的每个元素可以执行一次方法
panels.forEach(panel => {
    // 给panel添加点击事件
    panel.addEventListener('click', () => {
        // 排他思想
        removeActiveClasses()
        // 利用element.classList.add(),为元素添加新的类
        panel.classList.add('active')
    })
})

function removeActiveClasses() {
    panels.forEach(panel => {
        // 移除类
        panel.classList.remove('active')
    })
}