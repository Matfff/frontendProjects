const labels = document.querySelectorAll('.form-control label')

// foreach方法主要是针对数组而言的，对数组中的每个元素可以执行一次方法
labels.forEach(label => {
    // innerHTML   包括Html标签。
    // innerText   不包括Html标签。
    label.innerHTML = label.innerText
        // split() 方法用于把一个字符串分割成字符串数组。  
        // 不传任何切割标志时，默认切割每一个字符
        // stringObject.split(separator,howmany)
        // separator参数：必需填。字符串或正则表达式，从该参数指定的地方分割 stringObject。
        // howmany参数：可选。该参数可指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。
        .split('') // 分割每一个字符 ['E', 'm', 'a', 'i', 'l']， ['P', 'a', 's', 's', 'w', 'o', 'r', 'd']


        // map() 方法定义在JavaScript的Array中，它返回一个新的数组
        // array.map(function(currentValue, index, arr), thisIndex)
        // function(currentValue, index, arr)：必须。   为一个函数，数组中的每个元素都会执行这个函数。其中函数参数：
        // currentValue：必须。  表述当前元素的的值(item)
        // index：可选。         当前元素的索引也就是第几个数组元素。
        // arr：可选。           当前元素属于的数组对象
        // thisValue：可选。     对象作为该执行回调时使用，传递给函数，用作"this"的值
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)

        // join方法用于把数组中的所有元素放入一个字符串。 join参数作为分隔符
        .join('')
})