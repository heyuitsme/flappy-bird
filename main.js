let cvs = document.getElementById("mainCanvas");
let ctx = cvs.getContext("2d");

let bird = new Image();
let background = new Image();
let foreground = new Image();
let topPipe = new Image();
let botPipe = new Image();

bird.src = "images/bird.png";
background.src = "images/bg.png";
foreground.src = "images/fg.png";
topPipe.src = "images/pipeNorth.png";
botPipe.src = "images/pipeSouth.png";

var fly = new Audio();
var score = new Audio();

fly.src = "sounds/fly.mp3";
score.src = "sounds/score.mp3";

// gap in pixels between pipes
var gap = 375;

// bottom pipe position
var constant = topPipe.height + gap;

// bird x and y position
var bX = 10;
var bY = 150;

// number of pixels bird will fall
var gravity = 1.5;

// player score
var score = 0;


document.addEventListener("keydown", moveUp);

function moveUp(){
    bY -= 40;
    //fly.play();
}

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};


function draw(){
    ctx.drawImage(background, 0, 0);
    
    bY += gravity;

    for(var i=0; i<pipe.length; i++){
        ctx.drawImage(topPipe, pipe[i].x, pipe[i].y);
        ctx.drawImage(botPipe, pipe[i].x, pipe[i].y + constant);
        
        pipe[i].x--;

        // move pipes
        if(pipe[i].x == cvs.width - 188){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * topPipe.height) - topPipe.height
            });
        }


        // detect collision
        if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + topPipe.width && 
        (bY <= pipe[i].y + topPipe.height || bY+bird.height >= pipe[i].y + constant)
        || bY + bird.height >= cvs.height - foreground.height){
            location.reload();
        }

        if(pipe[i].x == 5){
            score++;
            // score.play();
        }
    }

    ctx.drawImage(foreground, 0, cvs.height-foreground.height);
    ctx.drawImage(bird, bX, bY);

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, cvs.height-20);

    requestAnimationFrame(draw);
}

draw();