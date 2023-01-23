class GridNode{
    constructor(id,isWall,isStart,isFinish,isVisited){
        this.id = id;
        this.isWall= isWall;
        this.isStart  = isStart;
        this.isFinish = isFinish;
        this.isVisited = isVisited;
    }
}

class Algorithms{
    constructor(){
        this.algorithmUser;
        this.selectedAlgorithm = "dijkstra";
        this.gridElement;
        this.graphElement;
        this.isGridVisible = false;
        this.isGraphVisisble = false;
        this.mouseDown = false;
        this.unsortedPoles = [];
        this.gridNodes;
        this.clickCount = 0;
    }

    setAlgorithmUser(user){
        this.algorithmUser = user;
    }

    getAlgorithmUser(){
        return this.algorithmUser;
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

    setGraphElement(graphElement){
        this.graphElement = graphElement;
    }

    getGraphElement(){
        return this.graphElement;
    }

    setGridVisible(isGridVisible){
        if(isGridVisible){
            this.gridElement.style.display = "block";
            this.isGridVisible = isGridVisible;
        }
        else{
            this.gridElement.style.display = "none";
            this.isGridVisible = isGridVisible;
        }
    }

    getGridVisible(){
        return this.isGridVisible;
    }

    setGraphVisible(isGraphVisisble){
        if(isGraphVisisble){
            this.graphElement.style.display = "block";
            this.isGraphVisisble = isGraphVisisble;
        }
        else{
            this.graphElement.style.display = "none";
            this.isGraphVisisble = isGraphVisisble;
        }
    }

    getGraphVisible(){
        return this.isGraphVisisble;
    }

    setMouseDown(mouseDown){
        this.mouseDown = mouseDown;
    }

    getMouseDown(){
        return this.mouseDown;
    }

    setUnsortedPoles(unsortedPoles){
        this.unsortedPoles = unsortedPoles;
    }

    getUnsortedPoles(){
        return this.unsortedPoles;
    }

    setGridNodes(gridNodes){
        this.gridNodes = gridNodes;
    }

    getGridNodes(){
        return this.gridNodes;
    }

    setClickCount(count){
        this.clickCount = count;
    }

    getClickCount(){
        return this.clickCount;
    }

}

let algorithm = new Algorithms();
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function setSelectedAlgorithm(event){
    algorithm.setAlgorithm(event.value);
    console.log("Algorithm is : "+event.value);
    document.getElementById("algo-button").textContent = "Run "+algorithm.getAlgorithm();
    if(algorithm.getAlgorithm()==="dijkstra"){
        algorithm.setGraphVisible(false);
        createGrid();
    }
    else{
        algorithm.setGridVisible(false);
        if(!algorithm.getGraphVisible()){
            createGraph();
        }
    }
}

function runAlgorithm(){
    if(algorithm.getAlgorithm()==="dijkstra"){
        sendDataToSocket();
    }
    else{

    }
}


window.onload = function(){
    createGrid();
    document.getElementById("algo-button").textContent = "Run Dijkstra";
    algorithm.setAlgorithmUser((Math.random() + 1).toString(36).substring(7));
    connectToSocket();
}

function createGrid(){
    var element = document.createElement("div");
    element.id = "grid-container";
    document.getElementById("main-content").append(element);
    element.addEventListener("mousedown", function () {
        console.log("Down");
        algorithm.setMouseDown(true);
        console.log(algorithm.getMouseDown());
    });
    
    element.addEventListener("mouseup", function () {
        console.log("up");
        algorithm.setMouseDown(false);
        console.log(algorithm.getMouseDown());
    });
    gridNodes = {};
    for(var i=0; i<40; i++){
        for(var j=0; j<40; j++){
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.id = i+"-"+j;
            cell.onclick = cellClicked;
            cell.onmouseover = cellVisited;
            element.append(cell);
            gridNodes[cell.id]=new GridNode(cell.id,false,false,false,false);
        }
    }
    algorithm.setGridNodes(gridNodes);
    $(".cell").width("1.9vw");
    $(".cell").height("2.5vh");
    algorithm.setGridElement(element);
    algorithm.setGridVisible(true);
    console.log(algorithm.getGridNodes());
}

function cellVisited(event){
    let cellId = event.target.id;
    console.log(cellId);
    if(algorithm.getMouseDown()){
        document.getElementById(cellId).className = "wall-cell";
        algorithm.getGridNodes()[cellId] = new GridNode(cellId,true,false,false,false);
    }
}

function cellClicked(event){
    let cellId = event.target.id;
    console.log(cellId);
    if(algorithm.getClickCount()===0){
        document.getElementById(cellId).style.backgroundColor = "orange";
        algorithm.getGridNodes()[cellId] = new GridNode(cellId,false,true,false,false);
        algorithm.setClickCount(algorithm.getClickCount()+1);
    }
    else if (algorithm.getClickCount()===1){
        document.getElementById(cellId).style.backgroundColor = "green";
        algorithm.getGridNodes()[cellId] = new GridNode(cellId,false,false,true,false);
        algorithm.setClickCount(algorithm.getClickCount()+1);
    }
}

function createGraph(){
    var c = document.createElement("canvas");
    c.style.width = "100%";
    c.style.height = "84vh";
    c.className = "my-canvas";
    document.getElementById("main-content").append(c);
    algorithm.setGraphElement(c);
    algorithm.setGraphVisible(true);
    var unsortedPoles = [];
    var x = 5;
    for(var i=0; i<28; i++){
        let randomHeight = randomNumber(10,140);
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.textAlign="center"; 
        ctx.strokeStyle = "red";
        ctx.rect(x, 5, 10, randomHeight);
        unsortedPoles.push(randomHeight);
        ctx.stroke();
        x = x+10;
    }
    algorithm.setUnsortedPoles(unsortedPoles);
    console.log(algorithm.getUnsortedPoles());
}

function connectToSocket(event){
    console.log(event);
    var socket = new SockJS('http://localhost:8080/testchat');
    stompClient = Stomp.over(socket);
    stompClient.reconnect_delay = 5000;
    stompClient.connect({}, onConnected, onErrorFromSocket);

}

function onConnected() {
    stompClient.subscribe('/start/initial.'+algorithm.getAlgorithmUser(), onMessageReceived);
  
  
    stompClient.send("/current/adduser."+algorithm.getAlgorithmUser(),
        {},
        JSON.stringify
        (
            {
                sender: algorithm.getAlgorithmUser(),
                type: 'JOIN',
                chat:"test"
            }
        )
    )
  
  }

  function sendDataToSocket(event) {

    let messageContent = {  
                            "grid":algorithm.getGridNodes()
                        }
  
    if(messageContent && stompClient) {
        var chatMessage = {
            sender: algorithm.getAlgorithmUser(),
            chat: JSON.stringify(messageContent),
            content: JSON.stringify(messageContent),
            type: 'CHAT'
        };
  
        stompClient.send("/current/shortestPath."+algorithm.getAlgorithmUser(), {priority:9}, JSON.stringify(chatMessage));
        messageContent= '';
    }
  }

function onErrorFromSocket(){
    console.log("erroe");
}

function onMessageReceived(payload){
    console.log(payload);
}