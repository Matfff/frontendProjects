const nums = document.querySelectorAll('.nums span')
const counter = document.querySelector('.counter')
const finalMessage = document.querySelector('.final')
const replay = document.querySelector('#replay')

runAnimation()

// 重置
function resetDOM() {
    counter.classList.remove('hide')
    finalMessage.classList.remove('show')

    nums.forEach((num) => {
        num.classList.value = ''
    })

    nums[0].classList.add('in')
}

function runAnimation() {
    // foreach方法主要有三个参数，分别是数组内容、数组索引、整个数组
    nums.forEach((num, idx) => {
        const nextToLast = nums.length - 1

        // animationstart - CSS 动画开始后触发
        // animationiteration - CSS 动画重复播放时触发
        // animationend - CSS 动画完成后触发
        num.addEventListener('animationend', (e) => {
            // 每一次动画完成都会触发一遍 if 判断
            if (e.animationName === 'goIn' && idx !== nextToLast) {
                num.classList.remove('in')
                num.classList.add('out')
                // nextElementSibling属性只返回元素节点之后的兄弟元素节点（不包括文本节点、注释节点）；
            } else if (e.animationName === 'goOut' && num.nextElementSibling) {
                num.nextElementSibling.classList.add('in')
            } else {
                counter.classList.add('hide')
                finalMessage.classList.add('show')
            }
        })
    })
}

replay.addEventListener('click', () => {
    resetDOM()
    runAnimation()
})