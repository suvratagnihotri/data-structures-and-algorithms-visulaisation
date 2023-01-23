package web.visualise.algorithms.entity;

public class GridNode {
    String id;
    boolean isWall;
    boolean isStart;
    boolean isFinish;
    boolean isVisited;
    int distance = Integer.MAX_VALUE;

    public GridNode(String id, boolean isWall, boolean isFinish, boolean isStart, int distance, boolean isVisited){
        this.id = id; 
        this.isWall = isWall;
        this.isStart = isStart;
        this.isFinish = isFinish;
        this.isVisited = isVisited;
        this.distance = distance;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public boolean isWall() {
        return isWall;
    }
    public void setWall(boolean isWall) {
        this.isWall = isWall;
    }
    public boolean isStart() {
        return isStart;
    }
    public void setStart(boolean isStart) {
        this.isStart = isStart;
    }
    public boolean isFinish() {
        return isFinish;
    }
    public void setFinish(boolean isFinish) {
        this.isFinish = isFinish;
    }
    public boolean isVisited() {
        return isVisited;
    }
    public void setVisited(boolean isVisited) {
        this.isVisited = isVisited;
    }
    public int getDistance() {
        return distance;
    }
    public void setDistance(int distance) {
        this.distance = distance;
    }
}
