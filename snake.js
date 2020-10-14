const cvs = document.getElementById("Snake");
const ctx = cvs.getContext("2d");

// create the units
const box = 32 ;
// loading images
const ground = new Image();
ground.src="ground.png";

const foodImg = new Image();
foodImg.src = "food.png";
// load audio
const dead =new Audio();
const eat =new Audio();
dead.src ="dead.mp3";
eat.src ="eat.mp3"

//create the snake
let snake = [];
snake[0]={
    x:9*box,
    y: 10*box
}

//create the food
let food = {
    x : Math.floor(Math.random()*17+1) *box,
    y : Math.floor(Math.random()*15+3) *box

}
//create the score var
let score = 0;

// control the snake
document.addEventListener("keydown",direction);
let d;
function direction(event){
    if(event.keyCode== 37 && d !="RIGHT"){
        d = "LEFT"
    }else if(event.keyCode == 38 && d !="DOWN"){
        d = "UP"
    }else if(event.keyCode == 39 && d != "LEFT"){
        d= "RIGHT"
    }else if (event.keyCode == 40 && d != "UP"){
        d = "DOWN"
    }
}
//check collision function
function collision(head,array){
    for(let i =0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw the canvas
function draw(){
    ctx.drawImage(ground,0,0);
    for(let i =0; i <snake.length; i++){
        ctx.fillStyle = (i == 0)? "blue":"gray";
        ctx.fillRect(snake[i].x,snake[i].y,box,box)

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box)
    }
    ctx.drawImage(foodImg,food.x,food.y);

    // OLD HEAD position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    // remove the tail
    //snake.pop();
    // in witch direction
if (d == "LEFT") snakeX -=box;
if (d == "UP") snakeY -=box;
if (d == "RIGHT") snakeX +=box;
if (d == "DOWN") snakeY +=box;  

// WHAT HAPPEN WHEN IT EATS THE FOOD
if(snakeX == food.x && snakeY == food.y){
    score++;
    eat.play();
    food = {
          x : Math.floor(Math.random()*17+1) *box,
        y : Math.floor(Math.random()*15+3) *box

    }
}else{
    snake.pop()
}
// ADD new head
let newHead = {
    x:snakeX,
    y:snakeY
}
// game over
if(snakeX < box || snakeX> 17 *box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
    clearInterval(game);
    dead.play();
}

snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px change one";
    ctx.fillText(score,2*box,1.6*box);   
}
// call draw function every 100ms

let game = setInterval(draw,100);