let data;
moveSpeed = 2;
seaFloorSpeed = 2;
fishOffScreen = false;
barFill = 100;
yearArr = [];
coralPercArr = [];
fishPercArr=[];
var c1, c2;


alive = true;

endGameTimer =0;

timePast = 0;
timeIndex = 0;
difference = 0;



//Load JSON File in Data
function preload(){
  data = loadJSON("../myFile.json");
}

function setup() {
  var i = 0;
  //loading the data from the JSON files into three arrays
  for(element in data){
    yearArr[i] = data[i].year;
    coralPercArr[i] = data[i].coral;
    fishPercArr[i] = data[i].fish;
    i++;
  }
  c1 = color("#2044b0");
  c2 = color("#add8e6");
  //displays the year from the json file
  document.getElementById("year").innerHTML = yearArr[0];

  xCanvas = windowWidth;
  yCanvas = windowHeight;
  barSize = xCanvas/4;
  createCanvas(xCanvas, yCanvas);
  //object instantiating
  schoolOfFish = new School(xCanvas, yCanvas, 16);
  seaFloor = new SeaFloor(xCanvas, yCanvas, seaFloorSpeed, 4);
  
}

function draw() { 
  //sets the gradient for the water in the visualisation
  setGradient(c2, c1);
  stroke(255);
  fill(255);
  seaFloor.DisplaySeaFloor();
  //handles all the movement of the fish on screen
  if(alive){
    if(keyIsDown(UP_ARROW) || keyIsDown(87)){
      
      for(var i = 0; i < schoolOfFish.fishes.length; i++){
        if(schoolOfFish.fishes[i].y < 0){
          fishOffScreen = true;
        }
      }
      if(!fishOffScreen){
        for(var i = 0; i < schoolOfFish.fishes.length; i++){
          schoolOfFish.fishes[i].y -= moveSpeed;
          schoolOfFish.fishes[i].moving = "up";
        }
      }
      fishOffScreen = false;
    }
    else if(keyIsDown(DOWN_ARROW) || keyIsDown(83)){

      for(var i = 0; i < schoolOfFish.fishes.length; i++){
        if(schoolOfFish.fishes[i].y > yCanvas*0.8){
          fishOffScreen = true;
        }
      }
      if(!fishOffScreen){
        for(var i = 0; i < schoolOfFish.fishes.length; i++){
          schoolOfFish.fishes[i].y += moveSpeed;
          schoolOfFish.fishes[i].moving = "down";
        }  
      }
      
          fishOffScreen = false;
    }else{
      for(var i = 0; i < schoolOfFish.fishes.length; i++){
        schoolOfFish.fishes[i].moving = "idle";
      }
      
    }
  }else{
    for(var i = 0; i < schoolOfFish.fishes.length; i++){
      schoolOfFish.fishes[i].moving = "down";
      schoolOfFish.fishes[i].y += moveSpeed;
    }
  }

    
    


    //code to look at all the fish and see if they collide with an energy ball
    if(alive){
      for(var i = 0; i < schoolOfFish.fishes.length; i++){
        for(var j = 0; j <seaFloor.GroundArray.length; j ++){
          for(var m = 0; m < seaFloor.GroundArray[j].coral.length;m++){
            for(var k = 0 ; k < seaFloor.GroundArray[j].coral[m].energyBallsArr.length; k ++){
              if( seaFloor.GroundArray[j].coral[m].energyBallsArr[k] != null){
                if(dist(schoolOfFish.fishes[i].x, schoolOfFish.fishes[i].y, seaFloor.GroundArray[j].coral[m].energyBallsArr[k].x, seaFloor.GroundArray[j].coral[m].energyBallsArr[k].y) < schoolOfFish.fishes[i].radius){
                  seaFloor.GroundArray[j].coral[m].energyBallsArr.splice(k, 1);
                  barFill += 5;
                }
              }
              
            }
          }
          
          
        }
      }
    }
    timePast++;
    //handles when the year should change over and update the coral and fish based on the json file
    if(timePast > 100){

      if(timeIndex >= yearArr.length){
        
      }else{
        document.getElementById("year").innerHTML = yearArr[timeIndex];
        timePast = 0;
        timeIndex++;
        if(fishPercArr[timeIndex-1] != 0){
          difference += fishPercArr[timeIndex] - fishPercArr[timeIndex -1];
        }

        
        if(schoolOfFish.fishes.length!=1){
          if(difference > 2){
            schoolOfFish.DeleteFish(); 
            difference = 0;
          }
          
        }


        //make it proportional to JSON file
        seaFloor.coralDensity = coralPercArr[timeIndex]/10; 

      }

      
    }
    

    

    if(barFill < 0){
      barFill = 0;
     alive = false;
    }else if(barFill > 100){
      barFill = 100;
    }


    if(!alive){
      endGameTimer += 0.4;
    }

    if(endGameTimer > 100){
      document.getElementById("endGameScreen").style.display = "block";
    }


    stroke(0);

    fill(0);
    rect(10, 10, barSize, 40);
    
    noStroke();
    fill( (100-barFill)/100 * 255,  barFill/100 * 255, 0); //change the health bar from green to red as it decreases.
    barFill -= 0.08;
    //represents the players health with a bar
    rect(10, 10, barSize * barFill/100, 40);

  schoolOfFish.DisplaySchool();
}

//sets a gradient of colour
function setGradient(c1, c2) {
  noFill();
  for (var y = 0; y < height; y++) {
    var inter = map(y, 0, height, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}



