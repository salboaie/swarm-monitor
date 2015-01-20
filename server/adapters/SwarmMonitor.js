/**
 *
 * @author Catalin Manolescu <cc.manolescu@gmail.com>
 */
    
var core        = require ("../../../SwarmCore/lib/SwarmCore.js");
var os          = require('os');
thisAdapter = core.createAdapter("SwarmMonitor");

var config  = getMyConfig('SwarmMonitor');

var activeServers = [];
var cpuHistory = [];
var memoryHistory = [];

getCPULoadHistory = function(systemId) {
    return cpuHistory[systemId] ? cpuHistory[systemId] : [];
};

getMemoryLoadHistory = function(systemId) {
    return memoryHistory[systemId] ? memoryHistory[systemId] : [];
};

updateSystemLoad = function(info) {
    console.log("Update system load : %j",info);
    var systemId = info.systemId;
    
    if (!memoryHistory[systemId]) {
        memoryHistory[systemId] = [];
    }

    memoryHistory[systemId].push({
        time: info.time,
        usedMemory: info.usedMemory
    });

    if (!cpuHistory[systemId]) {
        cpuHistory[systemId] = [];
    }

    cpuHistory[systemId].push({
        time: info.time,
        cpuLoad: info.cpuLoad
    });
};

/**
 * Update server status
 * @param status Server status
 */
notifyStatusChanged = function(status) {
    if (status) {
        if (status.alive) {
            activeServers[status.systemId] = status.adaptors;
        } else {
            delete activeServers[status.systemId];
        }
        console.log("Received notification for '%s' with status '%s'", status.systemId, status.alive ? 'alive' : 'dead');
    }
};


//make ping request
function pingServers() {
    startSwarm("ping.js", "ping");
}

function checkLoad() {
    startSwarm("systemLoad.js","start");
}

var pingInterval, checkLoadInterval;

//start watchers
setTimeout(function(){
    //check for active servers
    pingInterval = setInterval(function () {
        pingServers()
    }, config.pingInterval);
    pingServers(); 
    
    //check server load
    checkLoadInterval = setInterval(function () {
        checkLoad()
    }, config.checkLoadInterval);
    checkLoad();    
},2000);

function cleanUp() {
    clearInterval(pingInterval);
}

process.on('SIGINT', function () {
    //cleanUp();
});
