var monkey , monkey_running;
var banana ,bananaImage;
 var obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var background, BI;
var sound ;
var survival = 0;
var score = 0;

var crying;

function preload(){
  
  
monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  BP = loadImage("FOR.jpg");
  sound = loadSound("sound.mp3");
  cryingI = loadImage("over game.jpg");
 }

function setup() {
  createCanvas(600,500);
 
   background = createSprite(0,0,5000,500);
  background.addImage(BP);
  background.scale = 4;
  
  //creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,400,2000,10);
  ground.velocityX = -10;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  crying = createSprite(250,200);
  crying.addImage(cryingI);
  crying.scale=0.4;
  crying.visible=false;
  
  survival = 0;
   score = 0;
  
  text("SurvivalTime : " +survival ,500,50);
  
  
  text("SCORE :" +score ,500,50);
  
}


function draw() {
 
  
  
 // moving ground
    background.velocityX = -3 

    if (background.x < 0){
      background.x = background.width/4;
    }
  
  survival =  survival + Math.round(getFrameRate()/60);
  console.log(survival);
  
  if (ground.x<0){
    ground.x = ground.width/2;
  }
  
   if (keyDown("space") &&monkey.y>=155){
    monkey.velocityY= -10;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  spawnFood();
  spawnObstacles();
  
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score = score+1;
    console.log(score);
    sound.play();
  }
  
  if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX = 0;
    background.velocityX=0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    monkey.pause();
    crying.visible = true;
  }
  
  
drawSprites();
}
  
function spawnFood(){
  if(frameCount % 90 === 0){
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.velocityX = -5;
    banana.lifeTime = 300;
    monkey.depth = banana.depth+1;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount % 100 === 0){
    obstacle = createSprite(800,370,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.16;
    obstacle.lifeTime = 300;
    obstaclesGroup.add(obstacle);
  }
}


   














