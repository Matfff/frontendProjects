const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEL = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');

// getContext用于获取作用于画布的API
// "2d"：创建一个CanvasRenderingContext2D对象作为2D渲染的上下文。
// "webgl"(或"experimental-webgl")：创建一个WebGLRenderingContext对象作为3D渲染的上下文，只在实现了WebGL 2的浏览器上可用，实验性特性。
// "webgl2"：创建一个WebGL2RenderingContext对象作为3D渲染的上下文，只在实现了WebGL 3的浏览器上可用。
// "bitmaprenderer"：创建一个ImageBitmapRenderingContext，用于将位图渲染到canvas上下文上，实验性特性。
const ctx = canvas.getContext('2d');

let size = 10
let isPressed = false
colorEl.value = 'black'
let color = colorEl.value
let x
let y

canvas.addEventListener('mousedown', (e) => {
    isPressed = true

    x = e.offsetX
    y = e.offsetY
})

document.addEventListener('mouseup', (e) => {
    isPressed = false

    x = undefined
    y = undefined
})

canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const x2 = e.offsetX
        const y2 = e.offsetY

        drawCircle(x2, y2)
        drawLine(x, y, x2, y2)

        x = x2
        y = y2
    }
})

function drawCircle(x, y) {
    // beginPath() 方法开始一条路径，或重置当前的路径。
    ctx.beginPath();
    // arc(圆心x,圆心y,半径,开始的角度,结束的角度,是否逆时针)
    ctx.arc(x, y, size, 0, Math.PI * 2)
    // fillStyle 属性设置或返回用于填充绘画的颜色、渐变或模式。
    ctx.fillStyle = color
    // fill() 方法填充当前的图像（路径）。默认颜色是黑色。
    ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    // moveTo() 方法把路径移动到画布中的指定点，不创建线条。
    ctx.moveTo(x1, y1)
    // lineTo() 方法添加一个新点，然后创建从该点到画布中最后指定点的线条（该方法并不会创建线条）。
    ctx.lineTo(x2, y2)
    // strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式。
    ctx.strokeStyle = color
    // lineWidth 属性设置或返回当前线条的宽度，以像素计。
    ctx.lineWidth = size * 2
    ctx.stroke()
}

function updateSizeOnScreen() {
    sizeEL.innerText = size
}

increaseBtn.addEventListener('click', () => {
    size += 5

    if (size > 50) {
        size = 50
    }

    updateSizeOnScreen()
})

decreaseBtn.addEventListener('click', () => {
    size -= 5

    if (size < 5) {
        size = 5
    }

    updateSizeOnScreen()
})

// 当元素的值改变时发生 change 事件
colorEl.addEventListener('change', (e) => color = e.target.value)

// clearRect() 方法清空给定矩形内的指定像素。
clearEl.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height))