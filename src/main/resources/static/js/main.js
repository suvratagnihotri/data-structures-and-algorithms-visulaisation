class Algorithms{
    constructor(){
        this.selectedAlgorithm = "dijkstra";
        this.gridElement;
    }

    setAlgorithm(algorithm){
        this.selectedAlgorithm = algorithm;
    }

    getAlgorithm(){
        return this.selectedAlgorithm;
    }

    setGridElement(gridElement){
        this.gridElement = gridElement;
    }

    getGridElement(){
        return this.gridElement;
    }
}

let algorithm = new Algorithms();
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function setSelectedAlgorithm(event){
    algorithm.setAlgorithm(event.value);
    console.log("Algorithm is : "+event.value);
}
window.onload = function(){
    createGraph();
}

function createGrid(){
    var element = document.createElement("div");
    element.id = "grid-container";
    document.getElementById("main-content").append(element);
    for(var i=0; i<40; i++){
        for(var j=0; j<40; j++){
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.id = i+"-"+j;
            element.append(cell);
        }
    }
    $(".cell").width("1.9vw");
    $(".cell").height("2.5vh");
    algorithm.setGridElement(element);
}

function createGraph(){
    var x = 5;
    for(var i=0; i<10; i++){
        var c = document.createElement("canvas");
        c.style.width = "50px";
        let randomHeight = randomNumber(50,700);
        c.style.height = randomHeight+"px";
        c.className = "my-canvas";
        var ctx = c.getContext("2d");
        document.getElementById("main-content").append(c);
        ctx.beginPath();
        ctx.lineWidth = "6";
        ctx.strokeStyle = "red";
        ctx.rect(x, 5, 150, randomHeight);
        ctx.stroke();
        x = x+5;
    }
}

function connectToSocket(){

}

function onConnected(){

}

function sendDataToSocket(){

}

function onErrorFromSocket(){

}