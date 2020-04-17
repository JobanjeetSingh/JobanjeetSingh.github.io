var drawingSurface = document.getElementById('drawingSurface');
var ctx = drawingSurface.getContext('2d');
ctx.beginPath();
ctx.rect(0, 0, 2400, 1600);
ctx.fillStyle = "red";
ctx.fill();
let score = 0;
let health = 0;

//var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
//var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;


var width = window.innerWidth;
var height = window.innerHeight;
var velocity = 10;

function startGame(){

var myVar = setInterval(add, 300);
var myVar2 = setInterval(addBomb, 800);
ctx.rect(0, 0, 2400, 1600);
ctx.fillStyle = "red";
ctx.fill();
let score = 0;
let health = 0;


function distance(first, second){
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
}

function Coin(x, y, r, color, vx, vy){
  this.x = x;
  this.y = y;
  this.r = r;
  this.color = color;
  //this.vx = vx;
  this.vy = vy;

  this.coinDraw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    // ctx.stroke();
    // ctx.arc(this.x+5, this.y+5, this.r-20, 0, 2*Math.PI)
    ctx.stroke();
    ctx.fill();
  }
  this.move = function(ctx) {
    //this.x += this.vx;
    this.y += this.vy;
  }
}
  function bomb(x, y, r, color, vx, vy){
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    //this.vx = vx;
    this.vy = vy;

    this.bombDraw = function(ctx){
      ctx.fillStyle = this.color;
      ctx.strokeStyle = "black";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
      // ctx.stroke();
      // ctx.arc(this.x+5, this.y+5, this.r-20, 0, 2*Math.PI)
      ctx.stroke();
      ctx.fill();
    }
    this.move = function(ctx) {
      //this.x += this.vx;
      this.y += this.vy;
    }

}

var coins = [];
function add(){

  coins.push(new Coin(Math.floor((Math.random() * width-10) + 1), -50, 55,  "yellow", 0, velocity));
  velocity+= 0.01;
}


var bombs = [];
function addBomb(){

  bombs.push(new bomb(Math.floor((Math.random() * width-10) + 1), -50, 55,  "red", 0, velocity));
  velocity+= 0.01;
}


var duck = new Bucket(drawingSurface.width/2, 1500, 100, 100, "blue");
addEventListener('keydown', function(event){
if(event.keyCode == 37 && duck.x >=100){
  duck.x -= 100;
}
else if (event.keyCode == 39 && duck.x <=2200) {
 duck.x += 100;

}

})


function draw  () {

  ctx.clearRect(0,0, drawingSurface.width, drawingSurface.height);
    for(var i = 0; i< coins.length; i++){
      if(coins[i] != undefined){
      coins[i].coinDraw(ctx);
      //console.log(coins[i]);
    }}
    for(var i = 0; i< bombs.length; i++){
      if(bombs[i] != undefined){
      bombs[i].bombDraw(ctx);
      //console.log(coins[i]);
    }}
    duck.bucketDraw(ctx);
    ctx.font = '50px Arial';
    ctx.fillText("Score: "+score,2000,200);
    ctx.fillText("Health: "+health,2000,230);
}






function update() {

  for(var i = 0; i< coins.length; i++){
    if(coins[i] != undefined){coins[i].move(ctx);}

  }
  for(var i = 0; i< bombs.length; i++){
    if(bombs[i] != undefined){bombs[i].move(ctx);}

  }

  for(var i = 0; i< coins.length; i++){
    if(coins[i] != undefined){
    var collide = distance(duck, coins[i]);
    if(collide < coins[i].r + duck.w){
      coins[i].y = 1700;
      score++;

    }

  }

  }

  for(var i = 0; i< bombs.length; i++){
    if(bombs[i] != undefined){
    var collide = distance(duck, bombs[i]);
    if(collide < bombs[i].r + duck.w){
      bombs[i].y =1700;
      health++;
      if(health == 3){
        gameOver();
      }

    }

  }

  }

function gameOver(){
  alert("GAme OVer");
  health = 0 ;
  score = 0;
}



  for(var i = 0; i< coins.length; i++){
    if(coins[i].y > 1600){
      coins.splice(0, i);
    }
  }


}




function mainLoop() {

    update();
    draw();
    requestAnimationFrame(mainLoop);



}
mainLoop();
}
