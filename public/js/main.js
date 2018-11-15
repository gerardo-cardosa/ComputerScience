function setup() {
    var parent = 'sketch-holder';
    var width = document.getElementById(parent).offsetWidth;
    var canvas = createCanvas(width-100, width-100);
    canvas.parent(parent);
    background(200);
  }

var draw = function(){

}

function createArrayOfRandomVals(){
    var size = Math.floor(Math.random() * 100); 

    var arr = []
    for(var i = 0; i<=size; i++){
        arr[i] = Math.floor(Math.random() * 500);  
    }
    return arr;
}



function setBubble(){
    var fillBlack = 0 ;
    var fillWhite = 255
    //var unorderedArray = [2,6,4,8,9,7,3,1,5];
    var unorderedArray = createArrayOfRandomVals();
    var barWidth = 20;
    var current = 0;
    var compare = 1;
    var speed = 10;
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

            rect(0, 0, barWidth, unorderedArray[i] *5, 0, 0, 5, 5);
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
    var speed = 10;
    var speedCount = 1;
    var minPos = 0;
    var currPos = 1;
    var arrPos = 0;
    var isDone = false;
    //var unorderedArray = [2,6,4,8,9,7,3,1,5];
    var unorderedArray = createArrayOfRandomVals();
    var barWidth = 20;
    var minVal = unorderedArray[0];

    draw = function(){
        
            clear();
            background(200);
            fill(0);

            //draw array
            translate(30,20);
            for(var i=0; i< unorderedArray.length; i++){
                translate(barWidth*2,0);
                //line(0, 0, 0, unorderedArray[i]*10);
                //already sorted elements
                if(i <= arrPos ){
                    fill(200);
                }
                else if(i == minPos) {
                    fill(140);
                }
                else if(i == currPos){
                    fill(90)
                }
                else{
                    fill(0);
                }
    
                rect(0, 0, barWidth, unorderedArray[i] *5, 0, 0, 5, 5);
            }

        if(!isDone){
            if(speedCount % speed == 0){
                speedCount=1;
                
                if(unorderedArray[currPos] < minVal){
                    //check the min value
                    minPos = currPos;
                    minVal = unorderedArray[currPos];
                }
                else if(currPos >= unorderedArray.length){
                    //do swap
                    var swap = unorderedArray[minPos];
                    unorderedArray[minPos] = unorderedArray[arrPos];
                    unorderedArray[arrPos] = swap;

                    //reset
                    arrPos++;
                    currPos= arrPos ;
                    minVal = unorderedArray[arrPos];
                    minPos = arrPos;

                }

                else if(arrPos >= unorderedArray.length){
                    //done
                    isDone = true;
                    
                }
                    
                currPos++;
                
            }
            speedCount++;
        }
    }
}
  



function setMergeSort(){
    var speed = 10;
    var speedCount = 1;

    var postion = function(start, end){
        this.start = start;
        this.end = end;
        this.left = false;
        this.right = false;
    }

    var isDone = false;
    //var unorderedArray = [4,2,1,3];
    //var unorderedArray = [2,6,4,8,9,7,3,1,5];
    var unorderedArray = createArrayOfRandomVals();
    var barWidth = 20;
    var isMerging = false;

    var pila= []
    //initialization
    var middle = 0;
    pila.push(new postion(0, unorderedArray.length-1));


    var leftPos = 0;
    var rightPos = 0;
    var left = [];
    var right = [];

    var rangeStart = 0;
    var rangeEnd = 0;
    

    draw = function(){
        
            clear();
            background(200);
            fill(0);

            //draw array
            translate(30,20);
            for(var i=0; i< unorderedArray.length; i++){
                translate(barWidth*2,0);
                //line(0, 0, 0, unorderedArray[i]*10);
                //already sorted elements
                if(i <= unorderedArray.length/2 ){
                    fill(200);
                
                }
                else{
                    fill(0);
                }
    
                rect(0, 0, barWidth, unorderedArray[i] *5, 0, 0, 5, 5);
            }

        if(!isDone){
            if(speedCount % speed == 0){
                speedCount=1;
                //Merge sort
                if(!isMerging){
                    console.log('Pila length: ' + pila.length);
                    if(pila.length != 0){
                        var current = pila[pila.length-1];
                        console.log(JSON.stringify(current));
                        middle = parseInt( (current.end - current.start)/2) + current.start;
                        console.log('Midle: ' + middle);


                        if(current.end - current.start <1){
                            console.log('Single Element in Array');
                            pila.pop();
                            return;
                        }

                        if(!current.left && !current.right){
                            console.log('Creating Left side');
                            current.left = true;

                            //get the middle of possition
                            pila.push(new postion(current.start, middle));
                        }
                        else if(current.left && !current.right){
                            console.log('Creating right side');
                            
                            current.right = true;
                            pila.push(new postion(middle+1, current.end));
                        }
                        else if(current.left && current.right){
                            console.log('Ready to merge  side Start: ' + current.start + '   End: ' + current.end);
                            // set the merge
                            left = unorderedArray.slice(current.start,middle+1 );
                            right = unorderedArray.slice(middle+1,current.end+1);

                            console.log('left:' + left );
                            console.log('right: ' + right);

                            leftPos = 0;
                            rightPos = 0;

                            rangeStart = current.start;
                            rangeEnd = current.end;

                            isMerging = true;
                            pila.pop();
                            return;
                        }
                        
                    }
                    else{
                        console.log('Done!!')
                        isDone =  true;
                        return;
                    }
                }
                else{
                    //do the merge
                    if( leftPos >= left.length && rightPos >= right.length ){
                        isMerging = false;
                        console.log('Merge complete ---- ' + unorderedArray);
                    }
                    else{
                        console.log('leftCurr: ' + left[leftPos]);
                        console.log('RightCurr: ' + right[rightPos]);

                        var leftVal = leftPos >= left.length? Infinity: left[leftPos];
                        var righVal = rightPos >= right.length? Infinity: right[rightPos];

                        if( leftVal <= righVal){
                            unorderedArray[rangeStart] = leftVal;
                            leftPos++;
                            
                        }
                        else {
                            unorderedArray[rangeStart] = righVal;
                            rightPos++;                            
                        }
                        rangeStart++;
                    }

                }

    
                
            }
            speedCount++;
        }
    }
}
  


function bubble(){
    var fillBlack = 0 ;
    var fillWhite = 255
    //var unorderedArray = [2,6,3,1,5];
    var unorderedArray = createArrayOfRandomVals();
    var barWidth = 20;
    var current = 0;
    var compare = 1;
    var speed = 10;
    var speedCount =1;

    var isDone =  false;

    noLoop();
    redraw();
    calculateBubble();

    function calculateBubble(){


        function bub(){
            if(unorderedArray[current] > unorderedArray[compare]){
                var swap = unorderedArray[current];
                unorderedArray[current] = unorderedArray[compare];
                unorderedArray[compare] = swap;
            }
            

            compare++;
           
            if(compare >= unorderedArray.length){
                current++;
                compare=current+1;
                if(current >= unorderedArray.length ){
                    redraw();
                    return;
                }
            }
            redraw();
            setTimeout(bub, 0);

        }
        
        setTimeout(bub,500);            
                       

    }


    draw = function(){
        clear();
        background(200);
        fill(0);
        // draw the array
        translate(30,20);
        for(var i=0; i< unorderedArray.length; i++){
            translate(10,0);
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

           // rect(0, 0, barWidth, unorderedArray[i] *5, 0, 0, 5, 5);
           line(0,0, 0, unorderedArray[i] );
        }

    }

}