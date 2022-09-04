const button = document.getElementById('button')
const toasts = document.getElementById('toasts')

const messages = [
    'Message One',
    'Message Two',
    'Message Three',
    'Message Four',
]

const types = ['info', 'success', 'error']

button.addEventListener('click', () => createNotification())

// function createNotification(message = null, type = null) {   源代码
function createNotification() {
    // 创建div
    const notif = document.createElement('div')
    notif.classList.add('toast')
    // notif.classList.add(type ? type : getRandomType())   源代码
    notif.classList.add(getRandomType())

    // notif.innerText = message ? message : getRandomMessage()  源代码
    notif.innerText = getRandomMessage()

    toasts.appendChild(notif)

    setTimeout(() => {
        notif.remove()
    }, 3000)
}

function getRandomMessage() {
    return messages[Math.floor(Math.random() * messages.length)]
}

function getRandomType() {
    return types[Math.floor(Math.random() * types.length)]
}