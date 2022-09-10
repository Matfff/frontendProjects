const toggles = document.querySelectorAll('.toggle')
const good = document.querySelector('#good')
const cheap = document.querySelector('#cheap')
const fast = document.querySelector('#fast')

toggles.forEach(toggle => toggle.addEventListener('change', (e) => doTheTrick(e.target)))

function doTheTrick(theClickedOne) {
    // 三选二
    if (good.checked && cheap.checked && fast.checked) {
        // 最后一个点击的是Good 则取消Fast
        if (good === theClickedOne) {
            fast.checked = false
        }

        if (cheap === theClickedOne) {
            good.checked = false
        }

        if (fast === theClickedOne) {
            cheap.checked = false
        }
    }
}