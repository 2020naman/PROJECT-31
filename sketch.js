const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let wall1,wall2,bridge;
let stone1,stone2,stone3,stone4,stone5,stone6,stone7,stone8;
var zombie,button;
var collided=false;

function preload(){
  zombie1=loadImage("assets/zombie1.png");
  zombie2=loadImage("assets/zombie2.png");

  zombie3=loadImage("assets/zombie3.png");
  zombie4=loadImage("assets/zombie4.png");

  sadzombie=loadImage("assets/sad_zombie.png");

  backgroundImage=loadImage("assets/background.png");
  stoneImg=loadImage("assets/stone.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  zombie = createSprite(width/2-950, height - 110);
  zombie.addAnimation("lefttoright",zombie1,zombie2,zombie1);
  zombie.addAnimation("righttoleft",zombie3,zombie4,zombie3);
  zombie.addImage("sad",sadzombie);
  zombie.changeAnimation("lefttoright");
  zombie.scale = 0.1;
  zombie.velocityX = 10;
  
  button=createImg("assets/axe.png");
  button.position(width-200,height/2-50);
  button.size(50,50);
  button.mouseClicked(handleButtonPress);

  engine = Engine.create();
  world = engine.world;
  frameRate(80);
  wall_options={
    isStatic:true
  };
  
  wall1 = new Base(width-1800,height-400,300,300,wall_options);
  wall2 = new Base(width- 150,height-400,300,300,wall_options);
  bridge =new Bridge(40,{x:20,y:320});
  Matter.Composite.add(bridge.body,wall2)
  jointLink = new Link(bridge,wall2);

  stone1 = Bodies.circle(width-800,height-1000,40);
  World.add(world,stone1);
  stone2 = new Bodies.circle(width-1000,height-1000,50);
  World.add(world,stone2);
  stone3 = new Bodies.circle(width-600,height-1000,50);
  World.add(world,stone3);
  stone4 = new Bodies.circle(width-800,height-1000,50);
  World.add(world,stone4);
  stone5 = new Bodies.circle(width-600,height-1000,50);
  World.add(world,stone5);
  stone6 = new Bodies.circle(width-300,height-1000,50);
  World.add(world,stone6);
  stone7 = new Bodies.circle(width-830,height-1000,50);
  World.add(world,stone7);
  stone8 = new Bodies.circle(width-800,height-1000,50);
  World.add(world,stone8);
}

function draw() {
  background(51);
  imageMode(CENTER);
  image(backgroundImage,width/2,height/2,windowWidth,windowHeight);

  Engine.update(engine);

  bridge.show();
  image(stoneImg,stone1.position.x,stone1.position.y,100,100);
  image(stoneImg,stone2.position.x,stone2.position.y,100,100);
  image(stoneImg,stone3.position.x,stone3.position.y,100,100);
  image(stoneImg,stone4.position.x,stone4.position.y,100,100);
  image(stoneImg,stone5.position.x,stone5.position.y,100,100);
  image(stoneImg,stone6.position.x,stone6.position.y,100,100);
  image(stoneImg,stone7.position.x,stone7.position.y,100,100);
  image(stoneImg,stone8.position.x,stone8.position.y,100,100);

  if(collide(stone1,zombie)==true){
    zombie.changeAnimation("sad");
    zombie.velocityX=0;
  }

  if(collide(stone2,zombie)==true){
    zombie.changeAnimation("sad");
    zombie.velocityX=0;
  }

  if(collide(stone3,zombie)==true){
    zombie.changeAnimation("sad");
    zombie.velocityX=0;
  }

  if(collide(stone4,zombie)==true){
    zombie.changeAnimation("sad");
    zombie.velocityX=0;
  }

  if(collide(stone5,zombie)==true){
    zombie.changeAnimation("sad");
    zombie.velocityX=0;
  }

  if(collide(stone6,zombie)==true){
    zombie.changeAnimation("sad");
    zombie.velocityX=0;
  }

  if(collide(stone7,zombie)==true){
    zombie.changeAnimation("sad");
    zombie.velocityX=0;
  }

  if(collide(stone8,zombie)==true){
    zombie.changeAnimation("sad");
    zombie.velocityX=0;
  }

  if (zombie.position.x >= width - 300 && !collided) {
    zombie.velocityX = -10;
    zombie.changeAnimation("righttoleft");
  }

  if (zombie.position.x <= 300 && !collided) {
    zombie.velocityX = 10;
    zombie.changeAnimation("lefttoright");
  }

  Engine.update(engine);
  drawSprites();

}

function handleButtonPress(){
  jointLink.detach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}

function collide(body,sprite){
  if(body!=null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d<=80){
      return true
    }
    else{
      return false
    }
  }
}
