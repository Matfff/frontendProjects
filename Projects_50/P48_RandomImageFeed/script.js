const container = document.querySelector('.container')
const unsplashURL = 'https://source.unsplash.com/random/'
const rows = 5

for (let i = 0; i < rows * 3; i++) {
    const img = document.createElement('img')
    // 获得 30* x 30*大小的图     https://source.unsplash.com/random/302x308
    img.src = `${unsplashURL}${getRandomSize()}`
    container.appendChild(img)
}

function getRandomSize() {
    return `${getRandomNr()}x${getRandomNr()}`
}

// [0,10) + 300
function getRandomNr() {
    return Math.floor(Math.random() * 10) + 300
}