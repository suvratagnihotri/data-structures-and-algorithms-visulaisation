package web.visualise.algorithms.entity;

public class GridNode {
    String id;
    boolean isWall;
    boolean isStart;
    boolean isFinish;
    boolean isVisited;
    int distance = Integer.MAX_VALUE;
    int row;
    int column;
    GridNode previousNode;
    public GridNode getPreviousNode() {
        return this.previousNode;
    }

    public void setPreviousNode(GridNode previousNode) {
        this.previousNode = previousNode;
    }


    public GridNode(String id, boolean isWall, boolean isFinish, boolean isStart, int distance, boolean isVisited, int row, int column){
        this.id = id; 
        this.isWall = isWall;
        this.isStart = isStart;
        this.isFinish = isFinish;
        this.isVisited = isVisited;
        this.distance = distance;
        this.previousNode = null;   
        this.row = row;
        this.column = column;
    }

    public String getId() {
        return this.id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public boolean isWall() {
        return this.isWall;
    }
    public void setWall(boolean isWall) {
        this.isWall = isWall;
    }
    public boolean isStart() {
        return this.isStart;
    }
    public void setStart(boolean isStart) {
        this.isStart = isStart;
    }
    public boolean isFinish() {
        return this.isFinish;
    }
    public void setFinish(boolean isFinish) {
        this.isFinish = isFinish;
    }
    public boolean isVisited() {
        return this.isVisited;
    }
    public void setVisited(boolean isVisited) {
        this.isVisited = isVisited;
    }
    public int getDistance() {
        return this.distance;
    }
    public void setDistance(int distance) {
        this.distance = distance;
    }

    public int getRow() {
        return this.row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    public int getColumn() {
        return this.column;
    }

    public void setColumn(int column) {
        this.column = column;
    }
}
