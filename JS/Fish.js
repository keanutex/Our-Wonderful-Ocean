
//fish Class 
class Fish {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    
    this.theta = 0;
    this.inc = TWO_PI / 150.0;
    this.moving = "idle";
    this.shiftValue = 0.5;
    this.randomShift = this.randomNumFromInterval(0.5, this.shiftValue);
    this.randomScale = this.randomNumFromInterval(-10, 10)
    this.fishSprites = [];
    //scales the fish slightly differently
    this.imageWidth = 80 + this.randomScale;
    this.imageHeight = 60 + this.randomScale; 
    this.radius = this.imageWidth - 40;
    //loads the fish sprites into an array
    for(var i = 1; i < 17; i++){
      this.fishSprites[i] = loadImage('../media/Fish/' + i + '.png');
    }
    this.spriteIndex = floor(this.randomNumFromInterval(1, 16));
    
  }

  DisplayFish() {

   
    push(); //START DRAWING
    angleMode(RADIANS);
    stroke(0);
    //everything is in relation to the centre of the fish
    translate(this.x, this.y);

    //only perform bobbing movement when the fish isn't moving
    if (this.moving == "idle") {
      this.x = this.x;
      this.y = this.y + sin(this.theta * this.randomShift);
      this.theta += this.inc;
    }
    
    //tilt of fish when moving from input
    if (this.moving == "up") {
      rotate(-PI / 10);
    } else if (this.moving == "down") {
      rotate(PI / 10);
    }

    image(this.fishSprites[this.spriteIndex], -this.imageWidth/2, -this.imageHeight/2, this.imageWidth, this.imageHeight);



    pop(); //END DRAWING
  }


    

    
  

  randomNumFromInterval(min, max) { // min and max included 
    return (Math.random() * (max) + min);
}
}
