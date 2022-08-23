const smallCups = document.querySelectorAll('.cup-small')
const liters = document.getElementById('liters')
const percentage = document.getElementById('percentage')
const remained = document.getElementById('remained')

updateBigCup()

smallCups.forEach((cup, idx) => {
    cup.addEventListener('click', () => highlightCups(idx))
})

// highlight--突出、强调
// highlightCups(idx)逻辑：
// 当点击的 smallCups 没有 full 类时： idx的值不变， 下标为 0~idx 的 smallCups 添加 full 类
// 当点击的 smallCups 有full 类时：
// 如果点击的是最后一个 smallCups，移除最后一个 smallCups
// 如果不是最后一个 smallCups，判断后一个兄弟节点有没有 full 类， 如果有 idx值不变 否则 idx--
function highlightCups(idx) {
    // classList.contains( oldClassName );  确定元素中是否包含指定的类名，返回值为true 、false；
    if (idx === 7 && smallCups[idx].classList.contains("full")) idx--;
    // nextElementSibling属性只返回元素节点之后的兄弟元素节点（不包括文本节点、注释节点）；
    else if (smallCups[idx].classList.contains('full') && !smallCups[idx].nextElementSibling.classList.contains('full')) {
        idx--
    }

    smallCups.forEach((cup, idx2) => {
        if (idx2 <= idx) {
            cup.classList.add('full')
        } else {
            cup.classList.remove('full')
        }
    })

    updateBigCup()
}

function updateBigCup() {
    // full--完整的
    const fullCups = document.querySelectorAll('.cup-small.full').length
    // total--总的
    const totalCups = smallCups.length

    if (fullCups === 0) {
        // percentage--百分比
        // visibility:hidden; 属性值定义的元素是不可见不显示的，但是元素还会占据原有的空间
        percentage.style.visibility = 'hidden'
        // 大杯子没有水的时候
        percentage.style.height = 0
    } else {
        // visible：visible属性值定义的元素是可见显示的，是默认的属性值
        percentage.style.visibility = 'visible'
        percentage.style.height = `${fullCups / totalCups * 330}px`
        percentage.innerText = `${fullCups / totalCups * 100}%`
    }

    if (fullCups === totalCups) {
        // remained--剩余
        remained.style.visibility = 'hidden'
        remained.style.height = 0
    } else {
        remained.style.visibility = 'visible'
        liters.innerText = `${2 - (250 * fullCups / 1000)}L`
    }
}