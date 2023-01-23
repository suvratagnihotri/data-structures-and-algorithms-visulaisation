package web.visualise.algorithms.services;

import java.util.HashMap;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import web.visualise.algorithms.entity.GridNode;

@Service
public class ShortestPathService {
    
    public HashMap<String,GridNode> getGrid(String data){
        JSONObject jsonObject = new JSONObject(data);
        String content =  jsonObject.getString("content");
        JSONObject gridData = new JSONObject(content);  
        JSONObject gridObject = new JSONObject(gridData.get("grid").toString());
        HashMap<String,GridNode> grid = new HashMap<String,GridNode>();
        JSONObject keyData ;
        for (String key : gridObject.keySet()) {
            System.out.println(gridObject.get(key));
            keyData = new JSONObject(gridObject.get(key).toString());
            grid.put(key, new GridNode(keyData.getString("id"),
                                        keyData.getBoolean("isWall"),
                                        keyData.getBoolean("isFinish"),
                                        keyData.getBoolean("isStart"),
                                        Integer.MAX_VALUE,
                                        keyData.getBoolean("isVisited")));
        }

        return grid;

    }

    public void dijkstra(String data){
        this.getGrid(data);
    }

}
