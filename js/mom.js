var momObj = function(){
    this.x;
    this.y;
    this.angle;
    this.bigEye = [];
    this.bigTail = [];

    this.bigTailTimer = 0;
    this.bigTailCount = 0;

    this.bigEyeTimer = 0;
    this.bigEyeCount = 0;
    this.bigEyeInterval = 1000;

    this.momBodyOra = [];
    this.momBodyBlue = [];

    this.momBodyCount = 0;
}
momObj.prototype.init = function(){
    this.x = canvasWidth * 0.5;
    this.y = canvasHeight * 0.5;
    this.angle = 0;

    for(var i=0;i<8;i++){
        this.bigTail[i] = new Image();
        this.bigTail[i].src = './src/bigTail' + i + '.png';
    }
    for(var i=0;i<2;i++){
        this.bigEye[i] = new Image();
        this.bigEye[i].src = './src/bigEye' + i + '.png';
    }

    for(var i=0;i<8;i++){
        this.momBodyOra[i] = new Image();
        this.momBodyOra[i].src = './src/bigSwim' + i + '.png';

        this.momBodyBlue[i] = new Image();
        this.momBodyBlue[i].src = './src/bigSwimBlue' + i + '.png';
    }
};
momObj.prototype.draw = function(){

    //lerp x,y
    this.x = lerpDistance(mx,this.x,0.97);
    this.y = lerpDistance(my,this.y,0.97);

    //delta angle
    //Math.atan2(y,x)
    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    var beta = Math.atan2(deltaY,deltaX) - Math.PI;

    //lerp angle
    this.angle = lerpAngle(beta,this.angle,0.6);

    this.bigTailTimer += deltaTime;
    if(this.bigTailTimer>100){
        this.bigTailCount = (this.bigTailCount+1) % 8;
        this.bigTailTimer %= 50;
    }

    this.bigEyeTimer += deltaTime;
    if(this.bigEyeTimer>this.bigEyeInterval){
        this.bigEyeCount = (this.bigEyeCount+1) % 2;
        this.bigEyeTimer %= this.bigEyeInterval;

        if(this.bigEyeCount == 0){
            this.bigEyeInterval = Math.random() * 15000 + 2000;
        }else{
            this.bigEyeInterval = 200;
        }
    }

    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);

    var bigTailCount = this.bigTailCount;
    var bigEyeCount = this.bigEyeCount;

    var momBodyCount = this.momBodyCount;
    if(data.double == 1){
        ctx1.drawImage(this.momBodyOra[momBodyCount],-this.momBodyOra[momBodyCount].width * 0.5,-this.momBodyOra[momBodyCount].height * 0.5);
    }else{
        ctx1.drawImage(this.momBodyBlue[momBodyCount],-this.momBodyBlue[momBodyCount].width * 0.5,-this.momBodyBlue[momBodyCount].height * 0.5);
    }

    ctx1.drawImage(this.bigTail[bigTailCount],-this.bigTail[bigTailCount].width * 0.5 + 30,-this.bigTail[bigTailCount].height * 0.5);
    ctx1.drawImage(this.bigEye[bigEyeCount],-this.bigEye[bigEyeCount].width * 0.5,-this.bigEye[bigEyeCount].height * 0.5);
    ctx1.restore();
};