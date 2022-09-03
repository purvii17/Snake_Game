// Game constants
let inputDir = { x: 0, y: 0 }
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.wav');
const moveSound = new Audio('snaketurns.wav');
const musicSound = new Audio('bgmusic.mp3');
let speed = 4;
let score = 0;
let lastpainttime = 0;
let snakeArr = [{ x: 13, y: 15 }]
food = { x: 9, y: 10 }
let dummyfood = { x: 0, y: 0 }
var up = true
var down = true
var left = true
var right = true

// Game Functions

function main(ctime) {
    // musicSound.play()
    window.requestAnimationFrame(main); //it will call main function again and again , a game loop is formed 

    // console.log(ctime)
    if ((ctime - lastpainttime) / 1000 < 1 / speed) {
        return;
    }
    lastpainttime = ctime
    gameEngine();
}

function gameEngine() {
    // part 1 : updating the snake array & Food

    function isCollide(snake) {
        // return false;
        // if you bump into youself
        for (let i = 1; i < snakeArr.length; i++) {
            if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                return true;
            }
        }

        // if you bump into wall
        if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y <= 0 || snake[0].y >= 18) {
            return true;
        }
    }

    if (isCollide(snakeArr)) {
        gameOverSound.play()
        musicSound.pause()
        inputDir = { x: 0, y: 0 }
        alert('Game Over, press any key to play again!')
        snakeArr = [{ x: 13, y: 15 }]
        musicSound.play()
        score = 0;
        scoreVal.innerHTML = "Score : " + score
    }

    // if you have eaten the food, regenrate the food and also incrase the score
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play()
        score += 1
        if ((localStorage.getItem("hiscore")) < score) {
            hiscoreval = score
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            highScore.innerHTML = "HiScore : " + hiscoreval
        }
        scoreVal.innerHTML = "Score : " + score
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        console.log('1', food)
        for (let i = snakeArr.length - 2; i >= 0; i--) {
            while ((snakeArr[i].x == food.x) && (snakeArr[i].y == food.y)) {
                food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
            }
        }
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        // const element = array[i]
        snakeArr[i + 1] = { ...snakeArr[i] }
    }

    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y

    // part 2 : Display the snake and food
    // Display the snake
    board.innerHTML = ""
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    })

    //Display the food
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)

}


// Main logic starts here
musicSound.play()
let hiscore = localStorage.getItem("hiscore")
if (hiscore === null) {
    hiscoreval = 0
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    highScore.innerHTML = "HiScore : " + hiscore
}
window.requestAnimationFrame(main) //it will call main function
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }; // start the game
    moveSound.play();
    console.log('event triggered')
    
    switch (e.key) {
        case "ArrowUp":
            if (up) {
                inputDir.x = 0;
                inputDir.y = -1;
                break;

            }

        case "ArrowDown":
            if (down) {
                inputDir.x = 0;
                inputDir.y = 1;
                break;
            }

        case "ArrowRight":
            if (right) {
                inputDir.x = 1;
                inputDir.y = 0;
                break;
            }


        case "ArrowLeft":
            if (left) {
                inputDir.x = -1;
                inputDir.y = 0;
                break;
            }

        default:
            break;
    }
});