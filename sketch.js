var PLAY = 1;
var END = 0;
var gameState = 1;
var path,boy,cash,diamonds,jwellery,sword,invisibleGround;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameOver,endImg;



function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,580,20,20);
boy.addAnimation("sahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
  
  
  gameOver = createSprite(200,300,40,40);
  gameOver.addImage(endImg);
  gameOver.scale = 0.5;

}

function draw() {

  background(0);
  
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  
  if(gameState === PLAY){
    boy.x = World.mouseX;
    if (path.y > 400){
      path.y = path.height/2;
    }
    
    gameOver.visible = false;
    
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
     
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+120;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState = END;
    }
    }
  }
    if (gameState === END) {
     gameOver.visible = true;
      boy.visible = false;
      path.velocityY = 0;
     
     swordGroup.setLifetimeEach(-1);
     diamondsG.setLifetimeEach(-1);
     jwelleryG.setLifetimeEach(-1);
     cashG.setLifetimeEach(-1);
     
     
     swordGroup.setVelocityXEach(0);
     jwelleryG.setVelocityXEach(0);
     diamondsG.setVelocityXEach(0);
     cashG.setVelocityXEach(0);
      
     swordGroup.destroyEach();
     jwelleryG.destroyEach();
     diamondsG.destroyEach();
     cashG.destroyEach();
      
   }

  drawSprites(); 
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

  }

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 100 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}