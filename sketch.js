// Ball variables
let xBall = 300;
let yBall = 200;
let dBall = 13;
let raio = dBall / 2;
let velocidadeXball = 6;
let velocidadeYball = 6;

// Left racket variables
let xRacket = 5;
let yRacket = 150;
let RacketComprimento = 10;
let RacketAltura = 90;

// Right racket variables
let xRacket2 = 585;
let yRacket2 = 150;
let RacketComprimento2 = 10;
let RacketAltura2 = 90;

// Score variables
let scorehome = 0;
let scoreaway = 0;
let pointScored = false;

// Sound variables
let racketsound;
let scoresound;
let song;

// Pre-load assets
function preload() {
    song = loadSound("trilha.mp3");
    racketsound = loadSound("raquetada.mp3");
    scoresound = loadSound("ponto.mp3");
}

// Setup canvas and start background song
function setup() {
    createCanvas(600, 400);
    song.loop();
}

// Main game loop
function draw() {
    background(0);
    showball();
    speedball();
    verifyball();
    showracket1();
    racketmoviment1();
    racketmoviment2();
    verifycolide1();
    showracket2();
    verifycolide2();
    showscore();
    scoring();
}

// Display the ball
function showball() {
    circle(xBall, yBall, dBall);
}

// Move the ball by updating its position
function speedball() {
    xBall += velocidadeXball;
    yBall += velocidadeYball;
}

// Check ball boundaries and adjust its speed accordingly
function verifyball() {
    if (xBall + raio > width || xBall - raio < 0) {
        velocidadeXball *= -1;
        scoresound.play();
        pointScored = true;
    } else {
        pointScored = false; // Reset scoring flag
    }

    if (yBall + raio > height || yBall - raio < 0) {
        velocidadeYball *= -1;
    }
}

// Display left racket
function showracket1() {
    rect(xRacket, yRacket, RacketComprimento, RacketAltura);
}

// Display right racket
function showracket2() {
    rect(xRacket2, yRacket2, RacketComprimento2, RacketAltura2);
}

// Control the movement of left racket using W and S keys
function racketmoviment1() {
    if (keyIsDown(87)) yRacket -= 10;
    if (keyIsDown(83)) yRacket += 10;
    yRacket = constrain(yRacket, 10, 310);
}

// Control the movement of right racket using arrow keys
function racketmoviment2() {
    if (keyIsDown(UP_ARROW)) yRacket2 -= 10;
    if (keyIsDown(DOWN_ARROW)) yRacket2 += 10;
    yRacket2 = constrain(yRacket2, 10, 310);
}

// Check collision between ball and left racket
function verifycolide1() {
    if (xBall - raio < xRacket + RacketComprimento && 
        yBall - raio < yRacket + RacketAltura && 
        yBall + raio > yRacket) {
        velocidadeXball *= -1;
        racketsound.play();
        xBall = xRacket + RacketComprimento + raio;
    }
}

// Check collision between ball and right racket
function verifycolide2() {
    if (xBall + raio > xRacket2 && 
        yBall - raio < yRacket2 + RacketAltura2 && 
        yBall + raio > yRacket2) {
        velocidadeXball *= -1;
        racketsound.play();
        xBall = xRacket2 - raio;
    }
}

// Display scores for both players
function showscore() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(scorehome, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(scoreaway, 470, 26);
}

// Update scores based on ball position
function scoring() {
    if (pointScored) {
        if (xBall > 590) {
            scorehome += 1;
            pointScored = false;
        }
        if (xBall < 10) {
            scoreaway += 1;
            pointScored = false;
        }
    }
}
