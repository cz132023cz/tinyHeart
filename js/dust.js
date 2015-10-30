//漂浮物
var dustObj = function(){
    this.dustPic = [];
    this.x = [];
    this.y = [];
    this.amp = [];
    this.NO = [];

    this.alpha;
};
dustObj.prototype.num = 30;

dustObj.prototype.init = function(){
    for(var i=0;i<7;i++){
        this.dustPic[i] = new Image();
        this.dustPic[i].src = './src/dust'+i+'.png';
    }

    for(var i=0;i<this.num;i++){
        this.x[i] = Math.random() * canvasWidth;
        this.y[i] = Math.random() * canvasHeight;
        this.amp[i] = 20 + Math.random() * 15;
        this.NO[i] = Math.floor(Math.random() * 7);//0-6
    }
    this.alpha = 0;
};

dustObj.prototype.draw = function(){
    this.alpha += deltaTime * 0.0008;
    var l = Math.sin(this.alpha);
    for(var i=0;i<this.num;i++){
        var no = this.NO[i];
        ctx1.drawImage(this.dustPic[no],this.x[i] + this.amp[i]*l,this.y[i]);
    }
};