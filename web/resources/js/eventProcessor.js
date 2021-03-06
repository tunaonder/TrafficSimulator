/* 
 * Created by Sait Tuna Onder on 2017.04.07  * 
 * Copyright © 2017 Sait Tun Onder. All rights reserved. * 
 */

//Event Id. Will be Incremented for each received message
var eventId = 0;
var buildErrorInfo = 'Simulation Could not be Built!';
var eventQueue = [];

// Vehicle Create Event
function Event(type, time, vehicleId, speed, length, rotation, x, y, targetX, targetY, eventId) {
    this.type = type;
    this.time = time;
    this.vehicleId = vehicleId;
    this.speed = speed;
    this.length = length;
    this.rotation = rotation;
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.id = eventId;
}

// Change Direction Event
function Event2(type, time, vehicleId, rotation, eventId, x, y, speed) {
    this.type = type;
    this.time = time;
    this.vehicleId = vehicleId;
    this.rotation = rotation;
    this.id = eventId;
    this.x = x;
    this.y = y;
    this.speed = speed;

}

// Change Speed Event
function Event3(type, time, vehicleId, x, y, speed) {
    this.type = type;
    this.time = time;
    this.vehicleId = vehicleId;
    this.speed = speed;
    this.x = x;
    this.y = y;
}

// Destroy Vehicle Event
function Event4(type, time, vehicleId) {
    this.type = type;
    this.time = time;
    this.vehicleId = vehicleId;

}

// Change Traffic Light State Event
function Event5(type, time, lightId) {
    this.type = type;
    this.time = time;
    this.lightId = lightId;

}

function EndOfSimulationEvent(type, time, vehicleCount, averageTime) {
    this.type = type;
    this.time = time;
    this.vehicleCount = vehicleCount;
    this.averageTime = averageTime;
}


// This Method is called by websocket.js when a new message is received
// Events are created accordingly and added to Event Queue
function processEvent(event) {

    eventId++;

    if (event.action === "createVehicle") {

        
        var type = event.action;
        var time = event.time;
        var vehicleId = event.vehicleId;
        var speed = event.speed;
        var length = event.length;
        var x = event.x;
        var y = event.y;
        var targetX = event.targetX;
        var targetY = event.targetY;
        var rotation = event.rotation;

        var newEvent = new Event(type, time, vehicleId, speed, length, rotation, x, y, targetX, targetY, eventId);

        eventQueue.push(newEvent);

    } else if (event.action === "changeDirection") {
        var type = event.action;
        var time = event.time;
        var vehicleId = event.vehicleId;
        var rotation = event.rotation;
        var x = event.x;
        var y = event.y;
        var speed = event.speed;

        var newEvent = new Event2(type, time, vehicleId, rotation, eventId, x, y, speed);
        
        eventQueue.push(newEvent);

    } else if (event.action === "changeSpeed") {

        var type = event.action;
        var time = event.time;
        var vehicleId = event.vehicleId;
        var speed = event.speed;
        var x = event.x;
        var y = event.y;

        var newEvent = new Event3(type, time, vehicleId, x, y, speed);

        eventQueue.push(newEvent);

    } else if (event.action === "vehicleDestroy") {

        var type = event.action;
        var time = event.time;
        var vehicleId = event.vehicleId;

        var newEvent = new Event4(type, time, vehicleId);

        eventQueue.push(newEvent);
        
        
    } else if (event.action === "trafficLightStateChange") {

        var type = event.action;
        var time = event.time;
        var lightId = event.lightId;
        var newEvent = new Event5(type, time, lightId);
        eventQueue.push(newEvent);
    }
    
    else if (event.action === "buildError") {

        var errorDetail = event.errorDetail;
        alert(buildErrorInfo + '\nError: ' + errorDetail);
    }
    else if (event.action === "buildSuccess") {
        //Start Rendering
        simulationIsRunning = true;
    }
    
    else if(event.action === "endOfSimulation"){
        var type = event.action;
        var time = event.time;
        var vehicleCount = event.vehicleCount;
        var averageTime = event.averageTime;
        var endOfSimEvent = new EndOfSimulationEvent(type, time, vehicleCount, averageTime);
           
        eventQueue.push(endOfSimEvent);
    }

}

/**
 * Process Each event according to their types
 * @param {type} event
 * @returns {undefined}
 */
function processCurrentEvent(event) {

    if (event.type === "createVehicle") {
        createNewVehicle(event);
    } else if (event.type === "changeDirection") {
        changeVehicleDirection(event);

    } else if (event.type === "changeSpeed") {        
        changeVehicleSpeed(event);

    } else if (event.type === "vehicleDestroy") {
        destroyVehicle(event);

    } else if (event.type === "trafficLightStateChange") {
        changeTrafficLightState(event);

    }
    else if(event.type === "endOfSimulation"){
        processEndOfSimulation(event.vehicleCount, event.averageTime);
    }
    
}

/**
 * Displays the Simulation Results
 * @param {type} vehicleCount
 * @param {type} averageTime
 * @returns {undefined}
 */
function processEndOfSimulation(vehicleCount, averageTime){
    
    simulationIsRunning = false;
    
    alert("End of the Simulation!");

    document.getElementById("simResultForm:vehicleCount").value = vehicleCount;
    document.getElementById("simResultForm:averageTime").value = averageTime + " seconds";
    
    document.getElementById("simResultForm").style.display = 'inline';
    
}





