/*
 * Created by Sait Tuna Onder on 2017.03.19  * 
 * Copyright © 2017 Sait Tuna Onder. All rights reserved. * 
 */
package vt.canvas.component.factory;


import vt.canvas.component.EnterPoint;
import vt.canvas.component.TrafficLight;
import vt.canvas.component.Vehicle;
import vt.canvas.execution.events.TrafficLightStateChangeEvent;
import vt.canvas.execution.events.helpers.Event;
import vt.canvas.execution.events.VehicleCreateEvent;
import vt.canvas.execution.random.RandomVariate;
import vt.canvas.execution.random.UniformRandom;

/**
 * This class creates future events
 * @author Onder
 */

public class EventFactory {
    
    public EventFactory() {
    }
    
    /**
     * Schedules new vehicle creation event for the enter point
     * @param enterPoint
     * @param currentTime
     * @return 
     */
    public Event scheduleVehicleCreation(EnterPoint enterPoint, int currentTime) {
        
        // A time frame is 1/60 seconds
        // Generation Times are provided in terms of seconds
        RandomVariate random = new UniformRandom(enterPoint.getMinGenerationTime()*60, 
                 enterPoint.getMaxGenerationTime()*60);
        
        // Get random creation time
        int time = (int)random.nextDouble() + currentTime;
               
        Vehicle vehicle = enterPoint.getNewVehicle();

        return new VehicleCreateEvent(time, vehicle, enterPoint.getId());
    }
    
    /**
     * Schedules new traffic light state change for the traffic light
     * @param light
     * @param currentTime
     * @return 
     */
    public Event scheduleTrafficLightStateChange(TrafficLight light, int currentTime){
             
        int time;
        if(currentTime == 0 && light.getGreenStartTime() != 0){
            time = light.getGreenStartTime();
        }
        else{
            // If Vehicle is in Red State: time duration is redStateTime.
            // Otherwise the duration is greenStateTime
            // Add an extra 2 seconds to the red state (60 * 2)
            time = currentTime + (light.getState() == TrafficLight.STATE.RED ? 
                    light.getRedStateTime() + 120 : light.getGreenStateTime() - 120);
          
        }                 
        return new TrafficLightStateChangeEvent(time, light);
     
    }

}
