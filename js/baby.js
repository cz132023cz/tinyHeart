var babyObj = function(){
    this.x;
    this.y;
    this.babyEye = [];
    this.babyBody = [];
    this.babyTail = [];
    this.angle;

    this.babyTailTimer = 0;
    this.babyTailCount = 0;

    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000;

    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;
};

babyObj.prototype.init = function(){
    this.x = canvasWidth * 0.5 - 50;
    this.y = canvasHeight * 0.5 + 50;
    this.angle = 0;
    this.babyEye.src = './src/babyEye0.png';
    this.babyBody.src = './src/babyFade0.png';
    for(var i=0;i<8;i++){
        this.babyTail[i] = new Image();
        this.babyTail[i].src = './src/babyTail' + i + '.png';
    }

    for(var i=0;i<2;i++){
        this.babyEye[i] = new Image();
        this.babyEye[i].src = './src/babyEye' + i + '.png';
    }

    for(var i=0;i<20;i++){
        this.babyBody[i] = new Image();
        this.babyBody[i].src = './src/babyFade' + i + '.png';
    }
};

babyObj.prototype.draw = function(){

    //lerp x,y
    this.x = lerpDistance(mom.x,this.x,0.98);
    this.y = lerpDistance(mom.y,this.y,0.98);

    //delta angle
    //Math.atan2(y,x)
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    var beta = Math.atan2(deltaY,deltaX) - Math.PI;

    //lerp angle
    this.angle = lerpAngle(beta,this.angle,0.6);

    //baby tail count
    this.babyTailTimer += deltaTime;
    if(this.babyTailTimer>50){
        this.babyTailCount = (this.babyTailCount+1) % 8;
        this.babyTailTimer %= 50;
    }

    this.babyEyeTimer += deltaTime;
    if(this.babyEyeTimer>this.babyEyeInterval){
        this.babyEyeCount = (this.babyEyeCount+1) % 2;
        this.babyEyeTimer %= this.babyEyeInterval;

        if(this.babyEyeCount == 0){
            this.babyEyeInterval = Math.random() * 10000 + 2000;
        }else{
            this.babyEyeInterval = 200;
        }
    }

    //baby body
    this.babyBodyTimer += deltaTime;
    if(this.babyBodyTimer > 300){
        this.babyBodyCount = this.babyBodyCount + 1;
        this.babyBodyTimer %= 300;
        if(this.babyBodyCount > 19){
            this.babyBodyCount = 19;
            //game over
            data.gameOver = true;
        }
    }


    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);

    var babyTailCount = this.babyTailCount;
    var babyEyeCount = this.babyEyeCount;
    ctx1.drawImage(this.babyTail[babyTailCount],-this.babyTail[babyTailCount].width * 0.5 + 23,-this.babyTail[babyTailCount].height * 0.5);
    var babyBodyCount = this.babyBodyCount;
    ctx1.drawImage(this.babyBody[babyBodyCount],-this.babyBody[babyBodyCount].width * 0.5,-this.babyBody[babyBodyCount].height * 0.5);
    ctx1.drawImage(this.babyEye[babyEyeCount],-this.babyEye[babyEyeCount].width * 0.5,-this.babyEye[babyEyeCount].height * 0.5);
    ctx1.restore();
};