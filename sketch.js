//Game States
var PLAY=1;
var END=0;
var gameState=1;
var Lives = 3;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  backGroundImage = loadImage("bg.png");
  livesImage = loadImage("heart.png");

  //loading knife swoosh and game over sound
  knifeSwooshSound = loadSound("knifeSwoosh1.mp3")
  gameOverSound = loadSound("gameOver1.mp3");
  lifeGoneSound = loadSound("lifeLostSound.mp3");
  
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
  knife=createSprite(40,200,20,20);
  knife.addImage(knifeImage);
  knife.scale=0.7
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
  life1 = createSprite(30,50,20,20);
  life1.addImage(livesImage);
  life1.scale = 0.04
  
  life2 = createSprite(80,50,20,20);
  life2.addImage(livesImage);
  life2.scale = 0.04
  
  life3 = createSprite(130,50,20,20);
  life3.addImage(livesImage);
  life3.scale = 0.04
  
}

function draw() {
  background(backGroundImage);
  
  if(gameState===PLAY){
    
    //Call fruits and Monster function
    fruits();
    Monster();
    
    // Move sword with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // desrtroying fruit ,adding soound and increasing score if sword touching fruit
    if(fruitGroup.isTouching(knife)){
       fruitGroup.destroyEach();
       knifeSwooshSound.play();
       score = score+2;
      
    }
    else
    {
      // life loses if sword touching enemy
      if(monsterGroup.isTouching(knife)){
        lifeGoneSound.play();
        Lives = Lives-1;
        monsterGroup.destroyEach();
        
       }
      
      if(Lives === 2){
        life3.visible = false;
       }
  
      if(Lives === 1){
        life2.visible = false
       }
  
      if(Lives === 0){
    
        life1.visible = false
        //adding gameover sound 
        gameOverSound.play();
        gameState = END;
      
      }
      
    }
 }
  
  if(gameState === END){
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
    
        // Changing the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
    
        //adding gameover sound 
        //gameOverSound.play();
    
        //reset();
  }
  
  drawSprites();
  //Display score and lives
  fill("white")
  textSize(25);
  text("Score : "+ score,250,50);
  
}

function reset (){
  
  gameState = PLAY;
  
  fruitGroup.destroyEach();
  monsterGroup.destroyEach();
  
}


function Monster(){
  if(World.frameCount%150===0){
    monster=createSprite(600,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  
  
  
    if(position==1)
    {
    monster.x=600;
    //update below give line of code for increase fruitGroup speed by 4
    monster.velocityX=-(8+(score/4))
    }
    else
    {
      if(position==2){
      monster.x=0;
      
     //update below give line of code for increase fruitGroup speed by 4
      monster.velocityX= (8+(score/4));
      }
    }
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    
     //using random variable change the position of fruit, to make it more challenging
    
    if(position==1)
    {
    fruit.x=600;
    //update below give line of code for increase fruitGroup speed by 4
    fruit.velocityX=-(7+(score/4))
    }
    else
    {
      if(position==2){
      fruit.x=0;
      
     //update below give line of code for increase fruitGroup speed by 4
      fruit.velocityX= (7+(score/4));
      }
    }
    
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}