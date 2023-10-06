let board = document.querySelector(".board")
let inputDir = { x: 0, y: 0 }
const foodsound = new Audio("music/food.mp3")
const gameover_sound = new Audio("music/gameover.mp3")
const move_sound = new Audio("music/move.mp3")
const music = new Audio("music/music.mp3")
let score = 0;
snakearr = [{ x: 12, y: 13 }]
food = { x: 5, y: 8 }
let speed = 5
lastpaintTime = 0
//GAME functions 
function main(ctime) {
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if ((ctime - lastpaintTime) / 1000 < 1 / speed) {
        return;
    }
  lastpaintTime= ctime
    Game_engine()

}
//function for colliesion
function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakearr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x > 20 || snake[0].x <0 || snake[0].y > 20 || snake[0].y <0){
        return true;
    }
        
    return false;
}

function Game_engine() {
    
    //update the sanke and food
    if(isCollide(snakearr)){
        gameover_sound.play()
        music.pause()
        inputDir={x:0,y:0}
        alert("GAME OVER")
        snakearr=[{x:13,y:15}]
        //music.play()
        score=0

    }

    //randerd the sanke and food
    //add snake
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //display the food
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food")
    board.appendChild(foodElement)

//if snake eat food
if(snakearr[0].y === food.y && snakearr[0].x ===food.x){
    foodsound.play();
    score += 1;
    scorebox.innerHTML = "score: "+ score;
   
    snakearr.unshift({x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y});
    let a = 2;
    let b = 18;
    food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
}
    //to move the snake 
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] }
    }
    snakearr[0].x += inputDir.x
    snakearr[0].y += inputDir.y

}









    //use the logics
    window.requestAnimationFrame(main);
    window.addEventListener('keydown' , e => {
        inputDir = { x: 0, y: 1}
        move_sound.play()
        switch (e.key) {
            case "ArrowUp":
                console.log("ArrowUp")
                inputDir.x=0;
                inputDir.y=-1;
                break;
            case "ArrowDown":
                console.log("ArrowDown")
                inputDir.x=0
                inputDir.y=1
                break;
            case "ArrowRight":
                console.log("ArrowRight")
                inputDir.x=1
                inputDir.y=0
                break;
            case "ArrowLeft":
                console.log("ArrowLeft")
                inputDir.x=-1
                inputDir.y=0
                break;
        }
    })
    