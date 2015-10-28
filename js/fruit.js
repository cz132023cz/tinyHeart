var fruitObj = function(){
    this.alive = [];//bool
    this.x = [];
    this.y = [];
    this.l = [];
    this.fruitType = [];
    this.orange = new Image();
    this.blue = new Image();
    this.spd = [];
};
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function(){
    for(var i= 0,len=this.num;i<len;i++){
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.l[i] = 0;
        this.spd[i] = Math.random() * 0.017 + 0.002;
        this.fruitType[i] = '';
    }
    this.orange.src = './src/fruit.png';
    this.blue.src = './src/blue.png';
};
fruitObj.prototype.draw = function(){
    var num = 0;
    for(var i= 0,len=this.num;i<len;i++){
        //draw
        //find an ane,grow,fly up
        if(this.alive[i]){
            if(this.l[i] <= 14){
                this.l[i] += this.spd[i] * deltaTime;
            }else{
                this.y[i]-= this.spd[i] * 7 * deltaTime;
            }
            ctx2.drawImage(this.fruitType[i]=='blue'?this.blue:this.orange,this.x[i] - this.l[i] * 0.5,this.y[i] - this.l[i] * 0.5,this.l[i],this.l[i]);
            if(this.y[i] < 10){
                this.alive[i] = false;
            }
        }
    }
};
fruitObj.prototype.born = function(i){
    var aneID = Math.floor(Math.random() * ane.num);
    this.x[i] = ane.x[aneID];
    this.y[i] = canvasHeight - ane.len[aneID];
    this.l[i] = 0;
    this.alive[i] = true;
    var ran = Math.random();
    if(ran<0.2){
        this.fruitType[i] = 'blue';
    }else{
        this.fruitType[i] = 'oringe';
    }
};
fruitObj.prototype.dead = function(i){
    this.alive[i] = false;
}
function fruitMonitor(){
    var num = 0;
    for(var i=0;i<fruit.num;i++){
       if(fruit.alive[i]){
           num++;
       }
    }
    if(num < 15){
        sendFruit();
        return;
    }
}
function sendFruit(){
    for(var i=0;i<fruit.num;i++){
        if(!fruit.alive[i]){
           fruit.born(i);
            return;
        }
    }
}