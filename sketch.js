var database;
var dog,sadDog,happyDog;
var foodS;
var feed, addFood, foodObj;
var foodStock;
var fedTime, lastFed;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodObj = new Food();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood= createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);



}

function draw() {
  background(46,139,87);
  foodObj.display();

  drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);

}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  });
}

function feedDog(){
  dog.addImage(happyDog);

  if(foodObj.readStock(foodS)<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  } else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food :foodObj.getFoodStock(),
    FeedTime:hour()
})
};
