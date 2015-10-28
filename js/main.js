var can1;
var can2;
var ctx1;
var ctx2;

var canvasWidth;
var canvasHeight;

var lastTime;
var deltaTime;//两帧间隔的时间差

var bgPic = new Image();

var ane;
var fruit;

var mom;

var mx;
var my;

document.body.onload = game;

function game(){
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameLoop();
}

function init(){
    //获得canvas context
    can1 = document.getElementById('canvas1');//前面
    ctx1 = can1.getContext('2d');

    can2 = document.getElementById('canvas2');//后面
    ctx2 = can1.getContext('2d');

    can1.addEventListener('mousemove',onMouseMove);

    bgPic.src = './src/background.jpg';
    canvasWidth = can1.width;
    canvasHeight = can1.height;

    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();

    mx = canvasWidth * 0.5;
    my = canvasHeight * 0.5;
}

function gameLoop(){
    requestAnimFrame(gameLoop);//setInterval,setTimeout,fps,根据浏览器性能来决定帧数
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    ctx1.clearRect(0,0,canvasWidth,canvasHeight);
    ctx2.clearRect(0,0,canvasWidth,canvasHeight);
    momFruitsCollision();
    drawBackground();

    ane.draw();
    fruitMonitor();
    fruit.draw();


    mom.draw();
}

function onMouseMove(e){
    if(e.offsetX || e.layerX){
        mx = e.offsetX == undefined ? e.layerX : e.offsetX;
        my = e.offsetY == undefined ? e.layerY : e.offsetY;

    }
}