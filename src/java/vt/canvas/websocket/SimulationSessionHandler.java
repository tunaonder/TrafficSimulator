/*
 * Created by Sait Tuna Onder on 2017.03.08  * 
 * Copyright © 2017 Sait Tuna Onder. All rights reserved. * 
 */
package vt.canvas.websocket;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.enterprise.context.ApplicationScoped;
import javax.json.JsonObject;
import javax.websocket.Session;

/**
 *
 * @author Onder
 */


@ApplicationScoped
public class SimulationSessionHandler {

    //All Sessions are kept in this Map
    private static final Map<String, Session> sessions = new HashMap<>();

    public void addSession(Session session) {
        sessions.put(session.getId(), session);
        System.out.println("Session is added. Number of Active Sessions: " + sessions.size());

    }

    public void removeSession(Session session) {
        sessions.remove(session.getId());
        System.out.println("Session is removed. Number of Active Sessions: " + sessions.size());
    }

    private static void sendToSession(Session session, JsonObject message) {
        try {
            session.getBasicRemote().sendText(message.toString());
        } catch (IOException ex) {
            sessions.remove(session.getId());
            Logger.getLogger(SimulationSessionHandler.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    /**
     * Sends Message to a specific session
     * @param sessionIdentifier
     * @param message 
     */
    public static void sendMessageToClient(String sessionIdentifier, JsonObject message){    
        sendToSession(sessions.get(sessionIdentifier), message);        
    }

}