const body = document.body
const slides = document.querySelectorAll('.slide')
const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')

let activeSlide = 0

rightBtn.addEventListener('click', () => {
    activeSlide++

    if (activeSlide > slides.length - 1) {
        activeSlide = 0
    }

    setBgToBody()
    setActiveSlide()
})

leftBtn.addEventListener('click', () => {
    activeSlide--

    if (activeSlide < 0) {
        activeSlide = slides.length - 1
    }

    setBgToBody()
    setActiveSlide()
})

// 刷新页面时首先调用一次
setBgToBody()

function setBgToBody() {
    // 设置整个 body 的背景
    body.style.backgroundImage = slides[activeSlide].style.backgroundImage
}

// 设置滑块盒子里的背景
function setActiveSlide() {
    // 排他
    slides.forEach((slide) => slide.classList.remove('active'))

    slides[activeSlide].classList.add('active')
}