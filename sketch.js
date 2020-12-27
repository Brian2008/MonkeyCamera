var banana,bananaImage,bananaGroup
var obstacle,obstacleImage
var obstacleGroup
var bg,bgImage
var score 
var monkey, monkeyImage
var ground
var PLAY = 0
var STOP = 1
var gameState = 0


function preload()
{
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  bgImage = loadImage("jungle.jpg");
  
monkeyImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
obstacleImage = loadImage("stone.png");
  
banana = loadImage("banana.png");


}
function setup() {
  createCanvas(1500, 1000);
  bg = createSprite(400,1,1800,400)
  bg.addImage(bgImage);
  bg.scale=1.5
  bg.width=bg.width*10

  

  monkey = createSprite(50,340,20,50);
  monkey.addAnimation("running",monkeyImage);
  monkey.scale = 0.1
  ground = createSprite(400,380,1000,20)
  ground.visible=false
  
    score = 0
  obstaclesGroup = new Group();
  bananaGroup = new Group();
}

function draw() {
  background(220);
  monkey.depth=bg.depth+1
  
  if(gameState===0){
    monkey.collide(ground)
    monkey.velocityY=monkey.velocityY+0.8;
   if(keyWentDown("space")&&monkey.y>300) {
     monkey.velocityY = -20; 
   }
   if(keyDown(RIGHT_ARROW)){
    monkey.x=monkey.x+10
   }
   spawnBanana();
   spawnObstacle();
   if(bananaGroup.isTouching(monkey))
   {
     score=score+2
     bananaGroup.destroyEach();
   }
   
   if(obstaclesGroup.isTouching(monkey))
   {
     monkey.scale=0.1
     gameState= 1
   }
   drawSprites();
  }else if(gameState===1){
gameOver();

}
camera.position.y = monkey.y;
camera.position.x = monkey.x;}

function spawnBanana() 
{
  if(frameCount%200===0){
  banana=createSprite(monkey.x+800,random(200,100),20,20);     
  banana.addImage(bananaImage);
  banana.depth=bg.depth+1
  banana.scale=0.1;
  bananaGroup.add(banana);
  banana.lifetime=200
}
}
function spawnObstacle() 
{
  if(frameCount%60===0){
  obstacle=createSprite(monkey.x+800,370,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.depth=bg.depth+1
  obstacle.scale=0.2;
  obstaclesGroup.add(obstacle)
}
}
function gameOver(){
  monkey.visible = false;
  bananaGroup.visible = false;
  banana.visible = false;
  obstaclesGroup.visible = false;
  obstacle.visible = false;
  camera.x=camera.x
  monkey.x=monkey.x
  banana.lifetime=0
  obstacle.lifetime=0
  stroke("white")
  textSize(50);
  fill("white")
  text("Game Over",monkey.x+300,monkey.y-100)
}

