//School Class

class School {
    constructor(screenWidth, screenHeight, sizeOfSchool) {
        this.screenHeight = screenHeight;
        this.screenWidth = screenWidth;
        this.shiftValueX = 60;
        this.shiftValueY = 40;
        this.sizeOfSchool = sizeOfSchool;
        this.fishes = [];
        this.energyBalls;
        //spawns fish randomly around a central point on the screen
        for(var i = 0; i < this.sizeOfSchool; i++){
            let randomShiftX = this.randomIntFromInterval(-this.shiftValueX, this.shiftValueX);
            let randomShiftY = this.randomIntFromInterval(-this.shiftValueY, this.shiftValueY);


            this.fishes[i] = new Fish (200 + randomShiftX, screenHeight/2 + randomShiftY);
        }
    }
   //updates the array of energy balls so it knows what to look for
    UpdateEnergyBalls(energyBallsArr){
        this.energyBalls = energyBallsArr;
    }
    //displays the fish in the fish array
    DisplaySchool() {       
        for(var i = 0; i < this.fishes.length; i++){
            this.fishes[i].DisplayFish();
        }
    }
    //deletes the last fish in the array
    DeleteFish(){
        this.fishes.pop();
    }


    randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
  }
  