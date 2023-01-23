package web.visualise.algorithms.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import web.visualise.algorithms.entity.GridNode;
import web.visualise.algorithms.services.ShortestPathService;

@Controller
public class MainController {
    
    @GetMapping("/")
    public String getMainPage(){
        return "main";
    }
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private ShortestPathService shortestPathService;

    @MessageMapping("/shortestPath.{username}")
    @SendTo("/start/initial.{username}")
    public void shortestPath(String msg, @DestinationVariable String username, SimpMessageHeaderAccessor headerAccessor) {
        // System.out.println(msg);
        // HashMap<String,GridNode> grid =  shortestPathService.getGrid(msg);
        shortestPathService.dijkstra(msg);
        messagingTemplate.convertAndSend("/start/initial."+username,msg);
    }

    @MessageMapping("/sorting.{username}")
    @SendTo("/start/initial.{username}")
    public void sorting(String msg, @DestinationVariable String username, SimpMessageHeaderAccessor headerAccessor) {
        // System.out.println(msg);
        // shortestPathService.runAlgorithm(msg);
        messagingTemplate.convertAndSend("/start/initial."+username,msg);
    }

    @MessageMapping("/adduser.{username}") 
    @SendTo("/start/initial.{username}")
    public void addUser(String chatMessage, @DestinationVariable String username, SimpMessageHeaderAccessor headerAccessor) {
        System.out.println(chatMessage);
        messagingTemplate.convertAndSend("/start/initial."+username,chatMessage);
    }
}
