function setup() {
    var parent = 'sketch-holder';
    var width = document.getElementById(parent).offsetWidth;
    var canvas = createCanvas(width-100, width/2);
    canvas.parent(parent);
    background(200);
  }

var draw = function(){

}


function setBubble(){
    var fillBlack = 0 ;
    var fillWhite = 255
    var unorderedArray = [2,6,4,8,9,7,3,1,5];
    var barWidth = 20;
    var current = 0;
    var compare = 1;
    var speed = 20;
    var speedCount =1;

    var isDone =  false;
    draw = function(){
        clear();
        background(200);
        fill(0);
        // draw the array
        translate(30,20);
        for(var i=0; i< unorderedArray.length; i++){
            translate(barWidth*2,0);
            //line(0, 0, 0, unorderedArray[i]*10);
            if(i == current){
                fill(200);
            }
            else if(i == compare) {
                fill(140);
            }
            else{
                fill(0);
            }

            rect(0, 0, barWidth, unorderedArray[i] *20, 0, 0, 5, 5);
        }

        // bubble sort 
        if(speedCount % speed == 0){
            speedCount=1;

            if(!isDone){
                if(compare >= unorderedArray.length){
                    current++;
                    compare = current+1;
                    if(current >= unorderedArray.length){
                        isDone = true;
                        return;
                    }
                }
                else{
                    if(unorderedArray[current]> unorderedArray[compare]){
                        var swap = unorderedArray[current];
                        unorderedArray[current] = unorderedArray[compare];
                        unorderedArray[compare] = swap;
                    }
                    compare++;
                }
            }
        }
        speedCount++;
    }
}

function setSelectionSort(){
    draw = function(){
        if (mouseIsPressed) {
            fill(150);
          } else {
            fill(20);
          }
          ellipse(mouseX, mouseY, 80, 80);
    }
}
  