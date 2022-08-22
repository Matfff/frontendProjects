const toggle = document.getElementById('toggle')
const nav = document.getElementById('nav')

// classList.toggle( className )；
// 如果classList中存在给定的值，删除它，否则，添加它；
toggle.addEventListener('click', () => nav.classList.toggle('active'))