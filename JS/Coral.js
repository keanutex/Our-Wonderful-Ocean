//coral Class

class Coral {
    constructor(x, y, speed, rotation) {
  
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.rotation = rotation;
      this.randomScale = this.randomNumFromInterval(-20,30);
      this.imageWidth = 80 + this.randomScale;
      this.imageHeight = 80 + this.randomScale;

      this.coralSprites = [];
      //loads the coral sprites into an array to be used later
      for(var i = 1; i < 21; i++){
        this.coralSprites[i] = loadImage('../media/Coral1/' + i + '.png');
      }
      //picks a random sprite for the coral
      this.spriteIndex = floor(this.randomNumFromInterval(1, 20));
      
      this.energyBallsArr = [];
      //spawns energy at random intervals
      this.spawnTimer = floor(this.randomNumFromInterval(-5, 5));
      this.energyBallsArrCount = 0;
    }
   
  
    DisplayCoral() {
      push(); //START DRAWING
      
      stroke(0);
      //everything is in relation to the centre of the coral
      translate(this.x, this.y);
      //rotate the coral to match the ground it's on
      angleMode(DEGREES);
      rotate(this.rotation);
      this.x -= this.speed;
      //draw the coral
      image(this.coralSprites[this.spriteIndex], -this.imageWidth/2, -this.imageHeight+5, this.imageWidth, this.imageHeight);

      
      
      

      pop();

      this.spawnTimer += 0.02;
      //spawns energy
      if(this.spawnTimer > floor(this.randomNumFromInterval(5, 10))){
        this.energyBallsArr[this.energyBallsArrCount] = new EnergyBall(this.x, this.y, 2);
        this.energyBallsArrCount++;
        this.spawnTimer = 0;
      }
      for(var i = 0; i < this.energyBallsArr.length; i++){
        if(this.energyBallsArr[i] != null){
          this.energyBallsArr[i].DisplayEnergyBall();
          //removes the energy ball from the array when it exceeds it's lifetime
          if(this.energyBallsArr[i].lifetime > 20){
            splice(i,1);
          }
        }
        
      }
      
    }

    


    randomNumFromInterval(min, max) { // min and max included 
      return (Math.random() * (+max - +min) + +min); 
    }
  }
  