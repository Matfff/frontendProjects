const loadText = document.querySelector('.loading-text')
const bg = document.querySelector('.bg')

let load = 0

// setInterval（）是一个实现定时调用的函数，可按照指定的周期（以毫秒计）来调用函数或计算表达式
// setInterval方法会不停地调用函数，直到 clearInterval被调用或窗口被关闭
// setInterval 是 一个window 的方法
let int = setInterval(blurring, 30)

function blurring() {

    // 这里是先展示出样式， 再进行 load++, 与原项目相反

    loadText.innerText = `${load}%`
    // opacity 设置透明度
    // opacity = (-load / 100 + 1)
    loadText.style.opacity = scale(load, 0, 100, 1, 0)
    // blur = (-30 * load / 100 + 30)
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`

    load++

    if (load > 99) {
        clearInterval(int)
    }


}

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  }