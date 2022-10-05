
//Ground Class
class Ground {
    constructor(x1, y1, x2, y2, coralDensity) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.coralAngle;
        this.coralDensity = coralDensity;
        this.coral = [];

        angleMode(DEGREES);
        //gets the angle that the corals should be tilted using arctan of the slope
        if(y2<y1){
            this.coralAngle = atan((y2-y1)/(x2-x1));
        }else{
            this.coralAngle = atan((y2-y1)/(x2-x1));     
        }
        //calcualtes the line equation of the ground to find where to place the coral
        for(var i = 0; i < this.coralDensity; i++){
            this.m = (this.y2-this.y1)/(this.x2-this.x1);
            this.c = this.y1 - this.m*this.x1;
            this.x = this.randomNumFromInterval(this.x1, this.x2);
            this.y = this.m*this.x + this.c;
    
            
            
            this.coral[i] = new Coral(this.x, this.y, 2, this.coralAngle);
        }

        
    }


    //draws lines based on the constructor values
    DisplayGround(){
        stroke(255);
        strokeWeight(2);
        
        line(this.x1, this.y1, this.x2, this.y2);
        fill("#654321");
        noStroke();
        quad(this.x1, this.y1, this.x2, this.y2, this.x2 , this.y2+ 200, this.x1 , this.y1+ 200);

        
        for(var i = 0; i < this.coral.length; i++){
            if(this.coral[i] != null)
            this.coral[i].DisplayCoral();
        }
        

    }
    //prints info for the lines for debugging
    PrintInfo(){
        print("x1: " + this.x1 + " y1: " + this.y1 + " x2: " + this.x2 + " y2: " + this.y2);
    }

    randomNumFromInterval(min, max) { // min and max included 
        return (Math.random() * (+max - +min) + +min); 
      }
  
  
}