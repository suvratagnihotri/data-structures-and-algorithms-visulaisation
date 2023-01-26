package web.visualise.algorithms.services;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import web.visualise.algorithms.entity.GridNode;

@Service
public class ShortestPathService {
    List<GridNode> unvisitedNodes;
    GridNode startNode;
    GridNode finishNode;
    List<GridNode> unvisitedNeighbours = new ArrayList<GridNode>();
    public List<List<GridNode>> getGrid(String data){
        List<List<GridNode>> grid = new ArrayList<List<GridNode>>();
        this.unvisitedNodes = new ArrayList<GridNode>();
        JSONObject jsonObject = new JSONObject(data);
        String content =  jsonObject.getString("content");
        JSONObject gridData = new JSONObject(content);
        JSONObject startNode = new JSONObject(gridData.get("start-node").toString());
        this.startNode = new GridNode(  startNode.getString("id"),
                                        startNode.getBoolean("isWall"), 
                                        startNode.getBoolean("isFinish"),
                                        startNode.getBoolean("isStart"),
                                        startNode.getInt("distance"),
                                        startNode.getBoolean("isVisited"),
                                        startNode.getInt("row"),
                                        startNode.getInt("column"));

        JSONObject finishNodeJsonObject = new JSONObject(gridData.get("start-node").toString());
        this.finishNode = new GridNode(  finishNodeJsonObject.getString("id"),
                                        finishNodeJsonObject.getBoolean("isWall"), 
                                        finishNodeJsonObject.getBoolean("isFinish"),
                                        finishNodeJsonObject.getBoolean("isStart"),
                                        finishNodeJsonObject.getInt("distance"),
                                        finishNodeJsonObject.getBoolean("isVisited"),
                                        finishNodeJsonObject.getInt("row"),
                                        finishNodeJsonObject.getInt("column"));
        JSONArray jsonArray = new JSONArray(gridData.get("grid").toString());
        for(int i =0 ; i<jsonArray.length(); i++){
            JSONArray gridArray = new JSONArray(jsonArray.get(i).toString());
            List<GridNode> currentRow = new ArrayList<GridNode>();
            for(int j = 0; j<gridArray.length(); j++){
                JSONObject rowObject = new JSONObject(gridArray.get(j).toString());
                GridNode currentNode = new GridNode(rowObject.getString("id"),
                                                    rowObject.getBoolean("isWall"), 
                                                    rowObject.getBoolean("isFinish"),
                                                    rowObject.getBoolean("isStart"),
                                                    rowObject.getInt("distance"),
                                                    rowObject.getBoolean("isVisited"),
                                                    rowObject.getInt("row"),
                                                    rowObject.getInt("column"));
                currentRow.add(currentNode);
                if(currentNode.isFinish()){
                    System.out.println("Finish Node found");
                }
                this.unvisitedNodes.add(currentNode);
                
            }
            grid.add(currentRow);
        }
        System.out.println(grid.size());
        return  grid;
    }


    public List<GridNode> getNeighbours(GridNode currentNode,List<List<GridNode>> grid){
        List<GridNode> neighbours = new ArrayList<GridNode>();
        if(currentNode.getRow() > 0){
            neighbours.add(grid.get(currentNode.getRow()-1).get(currentNode.getColumn()));
        }
        if(currentNode.getRow()< grid.size()-1){
            neighbours.add(grid.get(currentNode.getRow()+1).get(currentNode.getColumn()));
        }
        if(currentNode.getColumn()>0){
            neighbours.add(grid.get(currentNode.getRow()).get(currentNode.getColumn()-1));
        }
        if(currentNode.getColumn()< grid.get(0).size()-1){
            neighbours.add(grid.get(currentNode.getRow()).get(currentNode.getColumn()+1));
        }
        neighbours.removeIf(GridNode::isVisited);
        return neighbours;        
    }

    public List<GridNode> sortUnvisitedNodes(List<GridNode> unvisitedNodes){
        unvisitedNodes
        .sort(
            Comparator.comparing(
                GridNode::getDistance
            )
        );
        return unvisitedNodes;
    }

    public void updateCurrentNodeNeighbours(GridNode currentNode,List<List<GridNode>> grid){
        List<GridNode> neighbours = this.getNeighbours(currentNode, grid);
        for (GridNode neighbour : neighbours) {
            neighbour.setPreviousNode(currentNode);
            neighbour.setDistance(currentNode.getDistance()+1);
        }
    }

    public List<GridNode> getNodesInVisistedOrder(List<List<GridNode>> grid, GridNode startGridNode, GridNode finishGridNode){
        List<GridNode> visitedNodesInOrder = new ArrayList<GridNode>();
        List<GridNode> unvisitedNodesInOrder = this.unvisitedNodes;
        startGridNode.setDistance(0);
        while (unvisitedNodesInOrder.size()>0) {
            unvisitedNodesInOrder = this.sortUnvisitedNodes(unvisitedNodesInOrder);
            GridNode currentNode = unvisitedNodesInOrder.remove(0);
            System.out.println("Distance :"+currentNode.getDistance());
            System.out.println("Unvisited Nodes Size :"+ unvisitedNodesInOrder.size());
            if(currentNode.isWall()){
                continue;
            }
            // if(currentNode.getDistance()==Integer.MAX_VALUE){
            //     return visitedNodesInOrder;
            // }
            currentNode.setVisited(true);
            visitedNodesInOrder.add(currentNode);
            if(currentNode.isFinish()){
                return visitedNodesInOrder;
            }
            this.updateCurrentNodeNeighbours(currentNode,grid);
        }
        return visitedNodesInOrder;
    }
    
    public HashMap<String,List<GridNode>> dijkstra(String data){
        List<List<GridNode>> grid =  this.getGrid(data);
        List<GridNode> nodesInVisitedOrder = this.getNodesInVisistedOrder(grid,this.startNode,this.finishNode);
        System.out.println(nodesInVisitedOrder.get(1).getPreviousNode());
        List<GridNode> sortestPath = this.getSortestPath(nodesInVisitedOrder.get(nodesInVisitedOrder.size()-1));
        // List<GridNode> sortestPath = this.getSortestPath(this.finishNode);

        System.out.println(sortestPath.get(0).getDistance());
        HashMap<String,List<GridNode>> dijkstraOutput= new HashMap<String,List<GridNode>>();
        dijkstraOutput.put("visited-nodes-order", nodesInVisitedOrder);
        dijkstraOutput.put("shortespath", sortestPath);

        return dijkstraOutput;
    }


    private List<GridNode> getSortestPath(GridNode finishNode) {
        List<GridNode> sortestPath = new ArrayList<GridNode>();
        GridNode currentNode = finishNode;
        while(currentNode != null){
            sortestPath.add(currentNode);
            // System.out.println("Distance: "+currentNode.getDistance() +" Previous node ID :" + currentNode.getPreviousNode().getId());
            System.out.println(sortestPath.size());
            currentNode = currentNode.getPreviousNode();
        }
        return sortestPath;
    }

}
