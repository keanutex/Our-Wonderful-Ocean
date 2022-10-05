//coral Class

class SeaFloor {
    constructor(screenWidth, screenHeight, speed, coralDensity) {
        this.GroundArray = [];
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.shiftValue = 40;
        this.speed = speed;
        this.randomCoral = this.randomIntFromInterval(-1, 0);
        this.coralDensity = coralDensity + this.randomCoral;
        

        //creates a an array of ground objects with their starting points being the previous endpoint, and there end points as random
        for(var i = 0; i < 10; i++){

            let randomShift = this.randomIntFromInterval(-this.shiftValue, this.shiftValue);

            if(i == 0){
                this.GroundArray[i] = new Ground(0, screenHeight*7/8, screenWidth/8 * (i+1), screenHeight*7/8 + randomShift, this.coralDensity);
            }else{
                this.GroundArray[i] = new Ground(this.GroundArray[i-1].x2, this.GroundArray[i-1].y2, screenWidth/8 * (i+1), screenHeight*7/8 + randomShift, this.coralDensity);
            }

        }
    }

    //displays all the ground objects
    DisplaySeaFloor(){
        for(var i = 0; i < this.GroundArray.length; i++){
            this.GroundArray[i].DisplayGround();

            this.GroundArray[i].x1-= this.speed;
            this.GroundArray[i].x2-= this.speed;
        }

        //removes the first ground in the array and adds a new ground to the end when the ground goes off the screen

        if(this.GroundArray[0].x2 < -50){
            let randomShift = this.randomIntFromInterval(-this.shiftValue, this.shiftValue);

            this.GroundArray.shift();
            this.GroundArray.push(new Ground(this.GroundArray[this.GroundArray.length-1].x2, this.GroundArray[this.GroundArray.length-1].y2, this.screenWidth/8 * (this.GroundArray.length+1), this.screenHeight-100 + randomShift, this.coralDensity))
        }
    }
    
    randomIntFromInterval(min, max) { // min and max included 
        return (Math.random() * (+max - +min) + +min);
    }

  }