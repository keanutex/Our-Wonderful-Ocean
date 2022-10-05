//coral Class

class EnergyBall {
    constructor(x, y, speed) {
  
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.lifetime = 0;

    }
   
  
    DisplayEnergyBall() {
      push(); //START DRAWING
      
      stroke(0);
      //everything is in relation to the centre of the energyball
      translate(this.x, this.y);
      this.y -= this.speed;
      this.x -= this.speed;
        fill("#e06c36");
        ellipse(0, 0, 20);
        this.lifetime += 0.02;
      pop();
    }

    randomNumFromInterval(min, max) { // min and max included 
      return (Math.random() * (max) + min);
    }
  }
  