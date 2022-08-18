const boxes = document.querySelectorAll('.box')

// addEventListener 事件监听方式
// eventTarget.addEventListener(type, listener[,useCapture])
// type:
// instener: 事件处理函数，事件发生时，就会调用监听函数
// useCapture：布尔值，默认是false;  false:表示在事件冒泡阶段调用事件处理程序， true:表示在事件捕获阶段调用事件处理程序
window.addEventListener('scroll', checkBoxes)

checkBoxes()

function checkBoxes() {
    // triggerBottom = 0.8倍窗口内容区域的高度
    const triggerBottom = window.innerHeight / 5 * 4

    boxes.forEach(box => {
        // getBoundingClientRect()获取元素位置，这个方法没有参数

        // getBoundingClientRect()用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。 
        // getBoundingClientRect()是DOM元素到浏览器可视范围的距离（不包含文档卷起的部分）。 
        
        // 该函数返回一个Object对象，该对象有6个属性：top,lef,right,bottom,width,height； 
        // rectObject = object.getBoundingClientRect();
 
        // rectObject.top：元素上边到视窗上边的距离;
        // rectObject.right：元素右边到视窗左边的距离;
        // rectObject.bottom：元素下边到视窗上边的距离;
        // rectObject.left：元素左边到视窗左边的距离;
        // rectObject.width：是元素自身的宽
        // rectObject.height是元素自身的高
        const boxTop = box.getBoundingClientRect().top

        // box 出现的位置不超过窗口视图的0.8倍
        if(boxTop < triggerBottom) {
            box.classList.add('show')
        } else {
            box.classList.remove('show')
        }
    })
}