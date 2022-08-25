const buttons = document.querySelectorAll('.ripple')

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        // 鼠标相对于浏览器窗口可视区域的X，Y坐标，可视区域不包括工具栏和滚动条，IE事件和标准事件支持
        const x = e.clientX
        const y = e.clientY
        console.log('y',y)

        // target 返回触发该事件的节点
        const buttonTop = e.target.offsetTop
        const buttonLeft = e.target.offsetLeft
        console.log('b',buttonTop)

        const xInside = x - buttonLeft
        const yInside = y - buttonTop

        const circle = document.createElement('span')
        circle.classList.add('circle')
        circle.style.top = yInside + 'px'
        circle.style.left = xInside + 'px'

        // appendChild() 方法可向节点的子节点列表的末尾添加新的子节点。
        this.appendChild(circle)

        setTimeout(() => circle.remove(), 50000)
    })
})