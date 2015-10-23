var fruitObj = function(){
    this.alive = [];//bool
    this.x = [];
    this.y = [];
    this.orange = new Image();
    this.blue = new Image();
};
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function(){
    for(var i= 0,len=this.num;i<len;i++){
        this.alive[i] = true;
        this.x[i] = 0;
        this.y[i] = 0;
        this.born(i);
    }
    this.orange.src = './src/fruit.png';
    this.blue.src = './src/blue.png';
};
fruitObj.prototype.draw = function(){
    var num = 0;
    for(var i= 0,len=this.num;i<len;i++){
        //draw
        //find an ane,grow,fly up
        ctx2.drawImage(this.orange,this.x[i] - this.orange.width * 0.5,this.y[i] - this.orange.height * 0.5);
    }
};
fruitObj.prototype.born = function(i){
    var aneID = Math.floor(Math.random() * ane.num);
    this.x[i] = ane.x[aneID];
    this.y[i] = canvasHeight - ane.len[aneID];

};