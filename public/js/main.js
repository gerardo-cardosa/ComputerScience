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
    var size = Math.floor(Math.random() * 200) +1; 

    var arr = []
    for(var i = 0; i<=size; i++){
        arr[i] = Math.floor(Math.random() * 700);  
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
            translate(3,0);
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


////////////////////////////////////////////////////////////
class GraphNode{
    constructor(name,value){
        this.name = name; 
        this.value = value;
        this.isVisited = false;
        this.children = new Map();
        this.parents = new Map();
        this.x = 0;
        this.y = 0;
    }
}
class Graph{
    constructor(){
        this.Nodes = new Map();
       // this.Edges = new Map();
    }

    createNote(name, value){
        const newNode = new GraphNode(name, value)
        this.Nodes.set(name, newNode);
        //this.Edges.set(name, new Map());
    }

    addMultiDirEdge(node1, node2){
        const firstNode = this.Node.get(node1);
        const secondNode = this.Node.get(node2);

        firstNode.children.set(secondNode.name, secondNode);
        secondNode.children.set(firstNode.name ,firstNode);
    }

    addDirectedEdge(from, to){
        const fromNode = this.Node.get(from);
        const toNode = this.Node.get(to);

        from.children.set(to, true);
        to.parents.set(from, true);
    }

    deleteNode(node){
        const currNode = this.Nodes.get(node);
        for(const child of currNode.children){
            child.parents.delete(node);
            child.children.delete(node);
        }

        for(const parent of currNode.parents){
            parent.children.delete(node);
        }

        this.Nodes.delete(node);
    }

}



function graphInit(){

    var parent = 'sketch-holder';
    var width = document.getElementById(parent).offsetWidth;

    //add buttons to add more nodes
    //display
    const buttons = `
        <text id="NodeName">
        <text id="NodeValue">
        <button id="addNode" type="button" onclick="addNode()">Add Node</button>
    `;


    const names =[
        ['John', 10],
        ['Jon', 3],
        ['Davis', 2],
        ['Kari', 3],
        ['Johnny', 11],
        ['Carlton', 8],
        ['Carleton', 2],
        ['Jonathan', 9],
        ['Carrie', 5]
    ];
    
    const synonyms = [
        ['Jonathan','John'],
        ['Jon','Johnny'],
        ['Johnny','John'],
        ['Kari','Carrie'],
        ['Carleton','Carlton']
    ];


    const graph = new Graph();

    for(const [name, val] of names){
        graph.createNote(name, val);
    }

    noLoop();


    draw = function(){
        translate(width / 2, height / 4);
        

        let grados = 360/graph.Nodes.size;
        let curr = 0;
        let vector = p5.Vector.fromAngle(radians(curr));

        for(const [key,node] of graph.Nodes){
            translate(p5.Vector.fromAngle(radians(curr), 180));
           //console.log('X:', vector.x, ' Y', vector.y);
           node.x = vector.x;
           node.y = vector.y;
            ellipse(vector.x,vector.y,75,75);
            const txt = `${node.name} \n  ${node.value}`;
            text(txt, 0-15, 0);
            vector = vector.rotate(HALF_PI);
            curr += grados;
        }


        for(const [key,node] of graph.Nodes){
            if(node.isVisited){
                node.isVisited = true;

                for(const child of node.children){
                    line(node.x, node.y, child.x, child.y);
                }
            }
        }


    }




}




///////////////////////////////////////////////////////////
class TreeNode{
    constructor(value){
        this.value = value;
        this.children = [];
        this.isVisited = false;
        this.x = 0;
        this.y = 0;
    }
}

class Tree{
    constructor(){
        this.root = null;
    }
}

function populateTree(distance){
    const tree = new Tree();
    tree.root = new TreeNode(5);
    for(let i = 0; i< 5; i++){
        const nodo = new TreeNode(i);
        nodo.y = distance*3;
        nodo.x = -(distance* 2 * 5) + (distance * i * 5);
        tree.root.children.push(nodo);
        for(let j = 10*i, dis = -2; j< (10*i)+6; j++, dis++){
            const child = new TreeNode(j);
            child.y = distance * (6 + 2* i);
            child.x = nodo.x + dis * distance * 2;
            nodo.children.push(child);
        }
    }
    return tree;
}

function basicTree(){
    var parent = 'sketch-holder';
    var width = document.getElementById(parent).offsetWidth;

    const nodeSize = 40;
    const tree = populateTree(nodeSize);    
    let queue = [];
    let drawQueue = []
    queue.push(tree.root);
    drawQueue.push(tree.root);

    console.log('basic tree');

    let isBFS = true;
    let prevState = true;;

    frameRate(2);
    draw =  function(){
        background(200);
        //clear();
        //console.log('draw');
        translate(width/2-nodeSize/2, nodeSize);
        const prev = null;

        while(queue.length > 0){
                const current = queue.pop();
                //console.log('IS visited:' , current.isVisited)
                if(current.isVisited){
                    fill('#D2FF9E');
                }
                else{
                    fill('#FFFFFF');
                }
                ellipse(current.x, current.y ,55,55);
                fill('black');
                text(current.value,current.x,current.y);
                for(const child of current.children){
                    line(current.x, current.y, child.x, child.y);
                    queue.unshift(child);
                }
            }

        if(drawQueue.length >0){
            if(isBFS){
                const curr = drawQueue.pop();
                curr.isVisited = true;
                for(const node of curr.children){
                    drawQueue.unshift(node);
                }
            }
            else{
                const curr = drawQueue.pop();
                curr.isVisited = true;
            }
        }else{
            resetVisited(tree.root);

            if(prevState){
                isBFS = false;
            }
            else{
                isBFS = true;
            }
            
            if(isBFS){
                drawQueue.push(tree.root);
               
            }
            else{
                console.log('Root', tree.root);
                DFS(tree.root, drawQueue);
                console.log('Drawqueue: ', drawQueue.length)
                
            }

            prevState = prevState? false: true;
            
        }

        if(queue.length <=0){
            queue.push(tree.root);
        }


        
    }

}

function DFS(root, list){
   // console.log('Dfs nodo: ', root);
    for(const child of root.children){
        DFS(child, list);
    }

    list.unshift(root);
}

function resetVisited(node){
    node.isVisited = false;
    for(const child of node.children){
        resetVisited(child);
    }

}


///////////////////////////////////////////////////////////
/// binary search tree
class BinarySearchTreeNode{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
        this.isVisited = false;
        this.x = 0;
        this.y = 0;
    }
}

class BinarySearchTree{
    constructor(value){
        this.root = new BinarySearchTreeNode(value);
    }

    addVal(value, offset){
        const newNode = new BinarySearchTreeNode(value);
        this.addNode(newNode, this.root, 1, -offset/2, offset/2);
    }

    addNode(newNode, root, level, start, end){

        console.log('NewNode Val: ', newNode.value, ' RootVa: ', root.value, ' Is new > root? ' , newNode.value>root.value, ' is new < root? ', newNode.value<root.value);
        if(root == null){
            root = newNode;
            root.y = level;
            root.x = start + (end - start)/2;
            console.log('Value Added ', start, end);
            return root;
        }
        else if (newNode.value < root.value){
           // console.log('possition: ',start, start + (Math.abs(end- start))/2,  (Math.abs(end- start))/2);
            if(root.left == null){                
                root.left = newNode; //this.addNode(newNode, root.left, level+1, start, start + (Math.abs(end- start))/2 );
                return;
            }
            this.addNode(newNode, root.left, level+1, start, start + (Math.abs(end-start))/2 );
            
        }
        else if(newNode.value > root.value){
            //console.log('possition: ',start, start + (Math.abs(end- start))/2,  (Math.abs(end- start))/2);
            if(root.right == null){
                root.right = newNode;//this.addNode(newNode, root.right, level+1, end - (Math.abs(end-start))/2, end  );
                return;
            }
            this.addNode(newNode, root.right, level+1, end -(Math.abs(end-start))/2, end );
        }
    }

    // drawTree(size){
    //     this.drawNode(this.root, size);
    // }

    // drawNode(root, size, parent){
    //     if(root == null)
    //         return;
        
    //     if(parent != undefined){
    //         line(parent.x, parent.y*50, root.x, root.y*50)
    //     }
    //     ellipse(root.x, root.y*50, size, size);
    //     text(root.value, root.x-size/4, root.y*50);
    //     this.drawNode(root.left, size, root);
    //     this.drawNode(root.right, size, root);
    // }

    drawTree(size, start, end){
        this.drawNode(this.root,  size, end/2 ,end, 2);
    }

    drawNode(node, size, pos, width, level){
        
        let posRight = pos + width/Math.pow(2,level);
        let posLeft = pos - width/Math.pow(2,level);

       // console.log("PosLeft: ",posRight);
        if(posLeft < letftLim || posRight > rightLim){
            scaleMagnitude -= 0.25;
            letftLim -= 40;
            rightLim+=300
            transMagni+=4;
        }
        
        ellipse(pos-size, level*50, size, size);
        text(node.value,pos-size ,level*50 )

        if(node.left != null){
            line(pos-size, level*50, posLeft-size, (level+1)*50);
            this.drawNode(node.left, size, posLeft, width, level+1);
        }

        if(node.right != null){
            line(pos-size, level*50, posRight-size, (level+1)*50);
            this.drawNode(node.right, size, posRight, width, level+1);
        }
    }

}

let bst= null;//new BinarySearchTree(10);
let  width;
let scaleMagnitude = 1;
let letftLim = 40;
let rightLim = 900;
let transMagni = 0;

function addValue(){
    let text = document.getElementById('valueText');
    if (text.value===""){
        return;
    }
    let intVal = parseInt(text.value);
    if(bst == null){
        bst = new BinarySearchTree(intVal);
    }else{
        bst.addVal(intVal, width);
    }
    console.log('Added value:',intVal);
    text.value = '';
}

function invertBinaryTree(){
    console.log('Invert tree')
    if(bst == null || bst.root == null){
        return
    }

    invertTree(bst.root);
}

function invertTree(root){
    const temp = root.left;
    root.left = root.right;
    root.right = temp;

    if(root.left != null){
        invertTree(root.left);
    }

    if(root.right != null){
        invertTree(root.right);
    }
}

function binSearchTree(){
    console.log('Binary Search Tree');
    var parent = 'sketch-holder';
    width = document.getElementById(parent).offsetWidth;

    let addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.value = 'Add Value';
    addButton.innerText = "Add Value";
    addButton.onclick = addValue;

    let valueText = document.createElement('input');
    valueText.type = 'number';
    valueText.id = 'valueText';    
    document.getElementById(parent).appendChild(valueText);
    document.getElementById(parent).appendChild(addButton);

    let invertButton = document.createElement('button');
    invertButton.type = 'button';
    invertButton.value = 'invert Tree';
    invertButton.innerText = "invert Tree";
    invertButton.onclick = invertBinaryTree;
    document.getElementById(parent).appendChild(invertButton);

    const nodeSize = 40;
    
    draw = function() {
        background(200);
        if(transMagni >0){
            translate(width/Math.pow(2,transMagni), nodeSize);
        }
        //line(0,0, width, 0);

        scale(scaleMagnitude);
        if(bst != null){
            bst.drawTree(nodeSize, 0, width);
        }
        // let start = 0;
        // let end = width;
        // let half = (end-start)/2 ;
        // ellipse(half - nodeSize,0,nodeSize, nodeSize );

        // let half2 = (half-start)/2;
        // ellipse(half2-nodeSize,100,nodeSize, nodeSize );

        // let half3 = (end-half)/2 + half;
        // ellipse(half3-nodeSize,100,nodeSize, nodeSize );

    }

}

function populateBST(){
    let min =0;
    let max = 100;
    let half = max/2;
    let arr = [];
    let count =0;
    bst = null;
    for(let i =0; i<=max; i++){
        arr.push(i);
    }
    console.log(arr)
    popBST( arr, min, max);
}

 
function popBST( arr, left, right){
    if(left > right || right <=left){
        return;
    }


    let half = Math.floor((right+left)/2);
    console.log(half);
    if(bst == null){
        bst = new BinarySearchTree(arr[half]);
    }
    else{
        bst.addVal(arr[half]);
    }

    popBST( arr, left, half);
    popBST( arr, half+1, right);
}


