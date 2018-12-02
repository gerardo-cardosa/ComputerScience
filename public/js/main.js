var canvas;

function setup() {
    var parent = 'sketch-holder';
    var width = document.getElementById(parent).offsetWidth;
    canvas = createCanvas(width-100, width/2);
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
    var speed = 2;
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
               // translate(barWidth*2,0);
               translate(10,0);
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
    
               // rect(0, 0, barWidth, unorderedArray[i] *5, 0, 0, 5, 5);
               line(0,0, 0, unorderedArray[i] );
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
    var speed = 2;
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
                translate(10,0);
                //line(0, 0, 0, unorderedArray[i]*10);
                //already sorted elements
                if(i <= unorderedArray.length/2 ){
                    fill(200);
                
                }
                else{
                    fill(0);
                }
    
               // rect(0, 0, barWidth, unorderedArray[i] *5, 0, 0, 5, 5);
               line(0,0, 0, unorderedArray[i] );
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
            //bub();
        }
        
        setTimeout(bub,500);            
                       

    }


    draw = function(){
        clear();
        background(200);
        fill(0);
        // draw the array
        translate(30, canvas.height - 10);
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
           line(0,0, 0, -unorderedArray[i] );
        }

    }

}





function selection(){

    //var unorderedArray = [2,6,3,1,5];
    var unorderedArray = createArrayOfRandomVals();
    var current = 0;
    var compare = 1;
    var min = 0;


    var isDone =  false;

    noLoop();
    redraw();
    calculaSelect();

    function calculaSelect(){


        function selection(){


            if(unorderedArray[min] > unorderedArray[compare]){
               min = compare;
            }
            

            compare++;
           
            if(compare >= unorderedArray.length){
                //swap current with min
                var swap = unorderedArray[min];
                unorderedArray[min] = unorderedArray[current];
                unorderedArray[current] = swap;


                current++;
                min = current;
                compare=current+1;
                if(current >= unorderedArray.length ){
                    redraw();
                    return;
                }
            }
            redraw();
            setTimeout(selection, 0);
        }
        
        setTimeout(selection,500);            
                       

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
                fill(200,45,76);
                triangle(0,-5, -5, -10, 5, -10);
            }
            else if(i == compare) {
                fill(140);
            }
            else if(i == min){
                fill(100,45,76);
                triangle(0,-5, -5, -10, 5, -10);
            }
            else{
                fill(0);
            }

           // rect(0, 0, barWidth, unorderedArray[i] *5, 0, 0, 5, 5);
           line(0,0, 0, unorderedArray[i] );
        }

    }

}




function quickSort(){

    //var unorderedArray = [20,60,30,10,50];
    
    var unorderedArray = createArrayOfRandomVals();
    //console.log(unorderedArray);
    var left = 0;
    var right = unorderedArray.length;
    var pivot = 0; 
    var start = 0;
    var end = right; 
    var speed = 300;


    var isDone =  false;

    noLoop();
    redraw();
    calculaQuickSort();

    function calculaQuickSort(){

        function quickSo(){
           setTimeout(quick(0, unorderedArray.length -1), speed);
        }


        function quick(l, r){
            if(l >= r){
                return;
            }

            let pivo = unorderedArray[ parseInt((l+r)/2)];
           // console.log('Pivot calculation: ' + pivo  +  ' l: ' + l + ' r:' +r + ' div: ' + parseInt((l+r)/2) );
           setTimeout(partition(l, r , pivo), speed);
            var index = left;
           // console.log('Index: ' + index);
            start = l; end = index-1
          //  console.log('Left Part ---------');
            setTimeout(quick(start, end), speed);
            start = index; end = r;
         //   console.log('Right Part ---------');
            setTimeout(quick(start, end), speed);

          //  console.log(unorderedArray);
        }


        function partition(le, ri, piv){
            
            left = le;
            right = ri;
            pivot = piv;
         //   console.log('Pivot: ' + pivot + ' Left: ' + left + ' Right: ' + right);
            if(le <= ri){
                if(unorderedArray[le] < piv){
                    le++;
                    redraw();
                    setTimeout(partition(le, ri, piv), speed);
                    
                }

                else if(unorderedArray[ri] > pivot){
                    ri --;
                    redraw();
                    setTimeout(partition(le, ri, piv), speed);
                   
                }

                else if(le <= ri){
            //        console.log('Swap ---');
             //       console.log(unorderedArray);
                    //swap
                    var swap = unorderedArray[le];
                    unorderedArray[le] =  unorderedArray[ri];
                    unorderedArray[ri] = swap;
              //      console.log('Swaped ---');
              //      console.log(unorderedArray);
                    le++;
                    ri--;
                    redraw();
                    setTimeout(partition(le, ri, piv), speed);
                    return;
                }
                redraw();
                
            }
            redraw();
            return;
        }
        
        redraw();
        setTimeout(quickSo,speed);            
                       

    }


    draw = function(){

        console.log('Draw Functions');

        clear();
        background(200);
        fill(0);
        // draw the array
        translate(30,20);
        for(var i=0; i< unorderedArray.length; i++){
            translate(10,0);
            //line(0, 0, 0, unorderedArray[i]*10);

            // betweem start and end

            if(i >= start && i <= end){
                fill(200,45,76);
            }
            else if(i == pivot) {
                fill(140);
                triangle(0,-5, -5, -10, 5, -10);
            }
            else if(i == left){
                fill(100,45,76);
                triangle(0,-5, -5, -10, 5, -10);
            }
            else if(i == right){
                fill(100,145,76);
                triangle(0,-5, -5, -10, 5, -10);
            }
            else{
                fill(0);
            }

            //triangle(0,-5, -5, -10, 5, -10);
           // rect(0, 0, barWidth, unorderedArray[i] *5, 0, 0, 5, 5);
           line(0,0, 0, unorderedArray[i] );
        }

    }

}



function quickSortIte(){

    //var arr = [20,60,30,10,50];
    var speed = 60;
    frameRate(speed);
    var arr = createArrayOfRandomVals();
    //console.log(unorderedArray);
    //noLoop();
    //redraw();
    loop();
    var top = 0;
    var ini = 0;
    var fin = 0;
    var pos = 0;

    var izq = 0;
    var der = 0;
    var aux = 0;
    var band = true;

    var step = 1;

    var pilaMen = [];
    var pilaMay = [];

    //setup
    pilaMen.push(0);
    pilaMay.push(arr.length-1);
    
    draw = function(){

        switch(step){
            case 1: 
                step1();
                break;
            case 2: 
                step2();
                break;
            case 3: 
                step3();
                break;
            case 4: 
                step4();
                break;
            case 5: 
                step5();
                break;
            case 6: 
                step6();
                break;
            case 7: 
                step7();
                break;
            case 8: 
                step8();
                break;
        }

        console.log('Ini: ' + ini + ' Fin: ' + fin + ' Pos: ' + pos + ' PilaMen: ' + pilaMen + ' PilaMay: ' +pilaMay + ' Step: ' + step );
        drawArray();
    }

    function step1(){
        if(pilaMen.length != 0 || pilaMay.length != 0){
            ini = pilaMen.pop();
            fin = pilaMay.pop();
            //top--;
            step = 2;
        }
        else{
            noLoop();
            //redraw();
        }

    }
    function step2(){
        izq = ini;
        der = fin;
        pos = ini;
        band = true;
        step = 3
    }
    function step3(){

        if(band){
            if(arr[pos] <= arr[der] && pos != der){
                der--;
            }
            else{
                step = 4
            }
        }
        else{
            step = 7;
        }
    }
    function step4(){
        if(pos == der){
            band = false;
            step = 3
        }
        else{
            aux = arr[pos];
            arr[pos] = arr[der];
            arr[der] = aux;
            pos = der;
            step = 5;
        }
        
    }
    function step5(){
        if(arr[pos] >= arr[izq] && pos != izq){
            izq++;
        }
        else{
            step = 6;
        }
    }
    function step6(){
        if(pos == izq){
            band = false;
        }
        else{
            aux = arr[pos];
            arr[pos] = arr[izq];
            arr[izq] = aux;
            pos = izq;
        }
        step = 3;
    }
    function step7(){
        if(ini <= (pos - 1)){
            //top++;
            pilaMen.push(ini);
            pilaMay.push(pos-1);
        }
        step = 8;
    }
    function step8(){
        if(fin >= pos+1){
            //top++;
            pilaMen.push(pos+1);
            pilaMay.push(fin);
        }
        step = 1;
    }

    


    function drawArray(){
        //console.log('Draw Functions');

       // clear();
        
        background(200);
        fill(0);
        // draw the array
        translate(30,20);
        for(var i=0; i< arr.length; i++){
            translate(10,0);
            //line(0, 0, 0, unorderedArray[i]*10);

            // betweem start and end

            stroke('black');
            if(i == pos) {
                fill(0,0,255);
                triangle(0,-5, -5, -10, 5, -10);
            }
             if(i == ini){
                fill(0,255,0);
                triangle(0,-5, -5, -10, 5, -10);
            }
            if(i == fin){
                fill(255,0,0);
                triangle(0,-5, -5, -10, 5, -10);
            }
            
            
            if(i >= ini && i <= fin){
                fill(32,200,150);
                stroke('red');
            }
            else{
                stroke('green');
            }
            
            //strokeWeight(4);
            //triangle(0,-5, -5, -10, 5, -10);
           // rect(0, 0, barWidth, unorderedArray[i] *5, 0, 0, 5, 5);
           line(0,0, 0, arr[i] );
        }
        
    }

}