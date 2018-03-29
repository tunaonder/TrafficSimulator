/*
 * Created by Sait Tuna Onder on 2017.03.16  * 
 * Copyright © 2017 Sait Tun Onder. All rights reserved. * 
 */
package vt.trafficnetwork.execution;

import javax.json.JsonArray;
import vt.trafficnetwork.builder.SimulationBuilder;

/**
 *
 * @author Onder
 */
public class SimulationRunner {

    private final SimulationBuilder simulationBuilder;

    private final Simulator sim;

    public SimulationRunner(String sessionIdentifier) {

        //Build the simulation model using the data sent by client
        this.simulationBuilder = new SimulationBuilder();        
        this.sim = new Simulator(sessionIdentifier);

    }

    public void execute(JsonArray modelData) {

        try {
            
            //Build Simulation Model for Simulation instance to be ready to start
            simulationBuilder.buildModel(modelData, sim);
        
        } catch (Exception e) {
            System.err.println(e);
            System.err.println("Could not build a simulation from the supplied model");
            return;
        }
        
        try {

            sim.start();

        } catch (Exception e) {
            System.err.println(e.getMessage());
            System.err.println("Simulation ended unexpectedly");
        }

    }
    
    public void requestNewEventsToVisualize(){
        sim.requestNewEventsToVisualize();      
    }
}
