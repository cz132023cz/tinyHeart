var can1;
var can2;
var ctx1;
var ctx2;

var canvasWidth;
var canvasHeight;

var lastTime;
var deltaTime;//两帧间隔的时间差

var bgPic = new Image();


document.body.onload = game;

function game(){
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}

function init(){
    //获得canvas context
    can1 = document.getElementById('canvas1');//前面
    ctx1 = can1.getContext('2d');

    can2 = document.getElementById('canvas2');//后面
    ctx2 = can1.getContext('2d');

    bgPic.src = './src/background.jpg';
    canvasWidth = can1.width;
    canvasHeight = can1.height;
}

function gameloop(){
    requestAnimFrame(gameloop);//setInterval,setTimeout,fps,根据浏览器性能来决定帧数
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    drawBackground();
}