class GridNode{
    constructor(id,isWall,isStart,isFinish,isVisited,row,column,distance){
        this.id = id;
        this.isWall= isWall;
        this.isStart  = isStart;
        this.isFinish = isFinish;
        this.isVisited = isVisited;
        this.row = row;
        this.column = column;
        this.distance = distance;
    }
}

class Algorithms{
    constructor(){
        this.algorithmUser;
        this.selectedAlgorithm = "dijkstra";
        this.startNode;
        this.finishNode;
        this.gridElement;
        this.graphElement;
        this.isGridVisible = false;
        this.isGraphVisisble = false;
        this.mouseDown = false;
        this.unsortedPoles = [];
        this.gridNodes;
        this.grid;
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

    setStartNode(startNode){
        this.startNode = startNode;
    }

    getStartNode(){
        return this.startNode;
    }

    setFinishNode(finishNode){
        this.finishNode = finishNode;
    }

    getFinishNode(){
        return this.finishNode;
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

    setGrid(grid){
        this.grid = grid;
    }
    getGrid(){
        return this.grid;
    }

    getClickCount(){
        return this.clickCount;
    }

    getRowAndColumn(cellId){
        return cellId.split("-");
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
        sendDataToDijkstraAlgorithm();
    }
    else{
        sendDataTOSortingAlgorith(algorithm.getAlgorithm());
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
    var gridNodes = {};
    var grid = [];
    for(var i=0; i<40; i++){
        var currentRow = [];
        for(var j=0; j<40; j++){
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.id = i+"-"+j;
            cell.onclick = cellClicked;
            cell.onmouseover = cellVisited;
            element.append(cell);
            gridNodes[cell.id]=new GridNode(cell.id,false,false,false,false,i,j,2147483647);
            currentRow.push(gridNodes[cell.id]);
        }
        grid.push(currentRow);
    }
    algorithm.setGrid(grid);
    algorithm.setGridNodes(gridNodes);
    $(".cell").width(700/40);
    $(".cell").height(660/40);
    algorithm.setGridElement(element);
    algorithm.setGridVisible(true);
    console.log(algorithm.getGridNodes());
}

function cellVisited(event){
    let cellId = event.target.id;
    const row = parseInt(algorithm.getRowAndColumn(cellId)[0]);
    const column = parseInt(algorithm.getRowAndColumn(cellId)[1]);
    if(algorithm.getMouseDown()){
        document.getElementById(cellId).className = "cell wall-cell";
        algorithm.getGrid()[row][column] = new GridNode(cellId,true,false,false,false,row,column,2147483647);     
    }
}

function cellClicked(event){
    let cellId = event.target.id;
    const row = parseInt(algorithm.getRowAndColumn(cellId)[0]);
    const column = parseInt(algorithm.getRowAndColumn(cellId)[1]);
    console.log(cellId);
    if(algorithm.getClickCount()===0){
        document.getElementById(cellId).style.backgroundColor = "orange";
        algorithm.getGrid()[row][column] = new GridNode(cellId,false,true,false,false,row,column,0);
        algorithm.setStartNode(new GridNode(cellId,false,true,false,false,row,column,0));
        algorithm.setClickCount(algorithm.getClickCount()+1);
    }
    else if (algorithm.getClickCount()===1){
        document.getElementById(cellId).style.backgroundColor = "green";
        algorithm.getGrid()[row][column] = new GridNode(cellId,false,false,true,false,row,column,2147483647);
        algorithm.setFinishNode(new GridNode(cellId,false,false,true,false,row,column,2147483647));
        algorithm.setClickCount(algorithm.getClickCount()+1);
    }
}

function createGraph(){
    const graph  = document.createElement("div");
    graph.className = "graph-container";
    graph.id = "graph";
    document.getElementById("main-content").append(graph);
    algorithm.setGraphElement(graph);
    algorithm.setGraphVisible(true);
    var unsortedPoles = [];
    for(var i=0; i<28; i++){
        var randomHeight = randomNumber(10,300);
        var bar = document.createElement("span");
        bar.className = "bar";
        bar.id = i+"_bar";
        bar.style.paddingBottom = randomHeight+"px";
        bar.style.backgroundColor = "blue";
        document.getElementById("graph").append(bar);
        unsortedPoles.push(Number(randomHeight));
    }
    algorithm.setUnsortedPoles(unsortedPoles);
}

function connectToSocket(event){
    console.log(event);
    var socket = new SockJS('http://localhost:8080/testchat');
    stompClient = Stomp.over(socket);
    stompClient.reconnect_delay = 5000;
    stompClient.connect({}, onConnected, onErrorFromSocket);

}

function onConnected() {
    stompClient.subscribe('/start/path.'+algorithm.getAlgorithmUser(), onMessageReceived);
    stompClient.subscribe('/start/sorting.'+algorithm.getAlgorithmUser(), onSortingResultReceived);

  
  
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

  function sendDataToDijkstraAlgorithm(event) {

    let messageContent = {  
                            "start-node":algorithm.getStartNode(),
                            "finish-node":algorithm.getFinishNode(),
                            "grid":algorithm.getGrid()
                        }
  
    if(messageContent && stompClient) {
        var chatMessage = {
            sender: algorithm.getAlgorithmUser(),
            content: JSON.stringify(messageContent),
            type: 'CHAT'
        };
  
        stompClient.send("/current/shortestPath."+algorithm.getAlgorithmUser(), {priority:9}, JSON.stringify(chatMessage));
        messageContent= '';
    }
  }

  function sendDataTOSortingAlgorith(algo){
    console.log(algo);
    let messageContent = {  
        "sorting-algorithm":algorithm.getAlgorithm(),
        "poles-heights":algorithm.getUnsortedPoles()
    }

    if(messageContent && stompClient) {
        var chatMessage = {
            sender: algorithm.getAlgorithmUser(),
            content: JSON.stringify(messageContent),
            type: 'CHAT'
        };

    stompClient.send("/current/sorting."+algorithm.getAlgorithmUser(), {priority:9}, JSON.stringify(chatMessage));
    messageContent= '';
    }
  }

function onErrorFromSocket(){
    console.log("erroe");
}

function onMessageReceived(payload){
    var data=payload["body"];
    if(data.includes("visited-nodes-order")){
        console.log(typeof(data));
        var jsonData = JSON.parse(data);
        console.log(jsonData["visited-nodes-order"]);
        // console.log(jsonData["shortespath"]);
        var shortestPath = jsonData["shortespath"];
        shortestPath.forEach(element => {
            console.log(element);
            if(document.getElementById(element["id"])){
                console.log("yes");
                // document.getElementById(element["id"]).className = "cell cell-visited";

                setTimeout(() => {
                    document.getElementById(element["id"]).className = "cell-visited";
                  }, 10 * 5);
            }
        });
    }
}

function onSortingResultReceived(payload){
    console.log(payload);
    var sortedArrayData = payload["body"];
    console.log(sortedArrayData);
    var data = JSON.parse(sortedArrayData);
        data.forEach(array =>
        {
            setTimeout(()=>{
                var i = 0;
                array.forEach(element => {
                    setTimeout(()=>{
                        console.log(element);
                            document.getElementById(i+"_bar").style.paddingBottom = element+"px";
                            i = i+1;
                    },10*element); 
                });
            },100);
        });
    }
    // var ctx = canvasElement.getContext("2d");
    // ctx.clearRect(0,0,canvasElement.style.width,canvasElement.style.height);
    // ctx.beginPath();