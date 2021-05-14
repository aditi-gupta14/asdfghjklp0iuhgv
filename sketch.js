//Create variables here
var Dog, DogImg, happyDogImg, database, foods, foodStock;

function preload()
{
	//load images here
  DogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/happyDogImg.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  foodStock.set(20);

  Dog = createSprite(250,350,10, 60);
  Dog.addImage(DogImg);
  Dog.scale = 0.2;
}


function draw() {  
  background("green");
  if(foods!== underdefined){
    textSize(20);
    fill(255);
    text("Press UP ARROW to feed DRAGO milk", 50, 50);
    text("Food Remaining: "+foods, 150, 150);

    if(keyWentDown(UP_ARROW)){
      writeStock(foods);
      Dog.addImage(happyDogImg);
    }

    if(keyWentUp(UP_ARROW)){
      Dog.addImage(DogImg);
    }

    if(foods === 0){
      foods = 20;
    }


    drawSprites();

  }
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
  x = x-1;
 }
 database.ref("/").update({
   Food:x
 });
}

function readStock(data){
  foods = data.val();
}




