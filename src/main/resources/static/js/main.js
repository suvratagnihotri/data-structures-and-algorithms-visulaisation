var selectedAlgorithm = "dijkstra";

function setSelectedAlgorithm(event){
    console.log(event.value);
    selectedAlgorithm = event.value;
    console.log("Selected Algorithm is :"+ selectedAlgorithm);
}