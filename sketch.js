var trex,trexrun,trex_is_dead,ground,invisiground,groundanimate,cloud,cloudimg,cactus,cactus1,c2,c3,c4,c5,c6,gamestate,gameover,resetbutton,gameoverimg,resetbuttonimg,scor;
var groupofcloud,cactusgroup1;
var PLAY=1;
var END=0;
var WIN=2;
localStorage["hihscor"] = 0;
gamestate=PLAY;
function preload()
{
  trexrun=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundanimate=loadImage("ground2.png");
  cloudimg=loadImage("cloud.png");
  cactus1=loadImage("obstacle1.png");
    c2=loadImage("obstacle2.png");
  c3=loadImage("obstacle3.png");
  c4=loadImage("obstacle4.png");
  c5=loadImage("obstacle5.png");
  c6=loadImage("obstacle6.png");
  trex_is_dead=loadAnimation("trex_collided.png");
  gameoverimg=loadImage("gameOver.png");
  resetbuttonimg=loadImage("restart.png");
  }

function setup() {
  createCanvas(displayWidth, displayHeight-120);
  trex=createSprite(50,170);
  trex.addAnimation("running",trexrun);
  trex.addAnimation("dead",trex_is_dead);
trex.scale=0.5;
  ground=createSprite(300,180,width,20);
  scor=0;
  ground.addImage(groundanimate);
  invisiground=createSprite(width/2,185,width,10);
  invisiground.visible=false;
  groupofcloud=new Group();
  cactusgroup1=new Group();
  gameover=createSprite(100,90);
      gameover.addImage("txt",gameoverimg);
  gameover.visible=false;
      
      resetbutton=createSprite(100,140);
      resetbutton.addImage("bruh_btn",resetbuttonimg); 
  resetbutton.visible=false;
  }

function draw() {
  background(180);
text("score:"+scor,500,50);
  if (gamestate===PLAY)
    {
          scor=scor+Math.round(getFrameRate()/60);
  if (keyDown("space")&&(trex.y>150))
    {
      trex.velocityY=-12;
    }
 if (ground.x<-100)
   {
     ground.x=width/2-120;
   }
  trex.velocityY=trex.velocityY+0.6;
  ground.velocityX=(-5-3*Math.round(scor/100));
  spawncloud();
  createobstacles();
      if (cactusgroup1.isTouching(trex))
        {
          gamestate=END;
        }
    }
  else if (gamestate===END)
    {
      groupofcloud.setVelocityEach(0,0);
      groupofcloud.setLifetimeEach(-1);
      cactusgroup1.setVelocityEach(0,0);
      cactusgroup1.setLifetimeEach(-1);
      trex.changeAnimation("dead",trex_is_dead);
      ground.setVelocity(0,0);
      trex.setVelocity(0,0);
      gameover.visible=true;
      resetbutton.visible=true;
      scor=0
      if (mousePressedOver(resetbutton))
      {
        gamestate=PLAY;
        trex.changeAnimation("running",trexrun);
        groupofcloud.destroyEach();
        cactusgroup1.destroyEach();
        gameover.visible=false;
        resetbutton.visible=false;
        if (localStorage["hihscor"]<scor)
        {
          localStorage["hihscor"] = scor;
        }
      console.log(localStorage["hihscor"])
      }
    }
    trex.collide(invisiground);
  drawSprites();

  camera.position.x=trex.x
 


  if(scor>99999){
alert("YOU WON!")
    gamestate=WIN;
    groupofcloud.destroyEach()
    cactusgroup1.destroyEach()
    groundanimate.visible=false
  }

  
}
function spawncloud()
{
  if (frameCount%100===0)
    {
      cloud=createSprite(600,Math.round(random(80,120)),30,10);
      cloud.addImage(cloudimg);
      cloud.velocityX=(-5-3*Math.round(scor/100));
      trex.depth=cloud.depth+1;
      cloud.lifetime=200;
      groupofcloud.add(cloud);
      
    }
  }

function createobstacles()
{
  if (frameCount%100===0)
    {
      cactus=createSprite(600,165);
      cactus.velocityX=(-5-2*Math.round(scor/100));
      var rand=Math.round(random(1,6));
     switch(rand)
     {
       case 1: cactus.addImage(cactus1);
         break;
        case 2: cactus.addImage(c2);
         break;
         case 3: cactus.addImage(c3);
         break;
         case 4: cactus.addImage(c4);
         break;
         case 5: cactus.addImage(c5);
         break;
         case 6: cactus.addImage(c6);
         break;
         default:console.log(rand);
         break;
     }
      cactus.scale=0.5;
      cactus.lifetime=200;
      cactusgroup1.add(cactus);
    }
}
