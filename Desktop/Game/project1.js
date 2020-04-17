var drawingSurface = document.getElementById('drawingSurface');
var ctx = drawingSurface.getContext('2d');
//let score = 0;


//var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
//var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;

var width = window.innerWidth;
var height = window.innerHeight;
var velocityBomb = 14;


var myVar = setInterval(addBombs, 250);

/*function distance(first, second){
  return Math.sqrt( Math.pow(first.x - second.x, 2) + Math.pow(first.y - second.y, 2) );
}


function Bucket(x, y, w, h, color){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.color = color;

  this.bucketDraw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.fill();
  }
}*/

function bomb(xb, yb, rb, colorb, vxb, vyb){
  this.xb = xb;
  this.yb = yb;
  this.rb = rb;
  this.colorb = colorb;
  //this.vx = vx;
  this.vyb = vyb;

  this.bombDraw = function(ctx){
    ctx.fillStyle = this.colorb;
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(this.xb, this.yb, this.rb, 0, 2*Math.PI);
    // ctx.stroke();
    // ctx.arc(this.x+5, this.y+5, this.r-20, 0, 2*Math.PI)
    ctx.stroke();
    ctx.fill();
  }

  this.moveBomb = function(ctx) {
    //this.x += this.vx;
    this.yb += this.vyb;
  }
}

var bombs = [];
function addBombs(){

  bombs.push(new bomb(Math.floor((Math.random() * 2200) + 200), -50, 70,  "red", 0, velocityBomb));
//  velocity++;
}

/*var duck = new Bucket(drawingSurface.width/2, 1500, 100, 100, "blue");
addEventListener('keydown', function(event){
if(event.keyCode == 37 && duck.x >=100){
  duck.x -= 100;
}
else if (event.keyCode == 39 && duck.x <=2200) {
 duck.x += 100;

}

})*/


function drawBomb  () {

  ctx.clearRect(0,0, drawingSurface.width, drawingSurface.height);
    for(var b = 0; b< bombs.length; b++){
      if(bombs[b] != undefined){
      bombs[b].bombDraw(ctx);
      //console.log(coins[i]);
    }}
    /*duck.bucketDraw(ctx);
    ctx.font = '50px Arial';
    ctx.fillText("Score: "+score,2000,200);*/
}






function updateBomb() {

  for(var b = 0; b< bombs.length; b++){
    if(bombs[b] != undefined){bombs[b].moveBomb(ctx);}

  }

  /*for(var b = 0; i< coins.length; i++){
    if(coins[i] != undefined){
    var collide = distance(duck, coins[i]);
    if(collide < coins[i].r + duck.w){
      coins[i].y = 1700;
      score++;

    }

  }




}*/




  for(var b = 0; b< bombs.length; b++){
    if(bombs[b].yb > 1600){
      bombs.splice(0, b);
    }
  }
}




function mainLoop() {

    updateBomb();
    drawBomb();
    requestAnimationFrame(mainLoop);



}
mainLoop();
