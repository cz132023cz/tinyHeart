var aneObj = function(){
    //起始点（不动）、控制点（不动）、结束点（一直动）
    this.rootx = [];
    this.headx = [];
    this.heady = [];
    //控制正弦函数的角度
    this.alpha = 0;
    //振幅
    this.amp = [];
};

aneObj.prototype.num = 50;
//初始化
aneObj.prototype.init = function(){
    for(var i= 0,len=this.num;i<len;i++){
        this.rootx[i] = i * 16 + Math.random() * 20;
        this.headx[i] = this.rootx[i];
        this.heady[i] = canvasHeight - 250 + Math.random() * 50;
        this.amp[i] = Math.random() * 50 +50;
    }
};
//画海葵
aneObj.prototype.draw = function(){
    this.alpha += deltaTime * 0.001;
    var l = Math.sin(this.alpha);
    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.lineWidth = 20;
    ctx2.lineCap = 'round';
    ctx2.strokeStyle = '#3b154e';
    for(var i= 0,len=this.num;i<len;i++){
        //beginPath,moveTo,lineTo,stroke,strokeStyle,lineWidth,lineCap,globalAlpha
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i],canvasHeight);
        this.headx[i] = this.rootx[i] + l * this.amp[i];
        ctx2.quadraticCurveTo(this.rootx[i],canvasHeight-100,this.headx[i],this.heady[i]);
        ctx2.stroke();
    }
    ctx2.restore();
};