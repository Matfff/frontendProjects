const counters = document.querySelectorAll('.counter')

counters.forEach(counter => {
    counter.innerText = '0'

    const updateCounter = () => {
        // getAttribute()获取的是服务器设置的数据。
        // HTML5允许开发者自由为其标签添加属性，这种自定义属性一般用“data-”开头。
        const target = +counter.getAttribute('data-target')
        // let a = '10'
        // console.log(typeof(+a))
        // 将字符串转为数字型
        const c = +counter.innerText
        

        const increment = target / 200

        if (c < target) {
            // Math.round()  “四舍五入”
            // Math.ceil()  “向上取整”
            counter.innerText = `${Math.ceil(c + increment)}`
            // setTimeout方法是指在指定时间后执行一次指定函数。强调！只执行一次！
            setTimeout(updateCounter, 1)
        } else {
            counter.innerText = target
        }
    }

    updateCounter()
})



