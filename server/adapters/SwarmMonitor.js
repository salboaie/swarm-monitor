/**
 *
 * @author Catalin Manolescu <cc.manolescu@gmail.com>
 */
    
var core        = require ("../../../SwarmCore/lib/SwarmCore.js");
var os          = require('os');
var fs          = require('fs');
var moment      = require('moment');

thisAdapter = core.createAdapter("SwarmMonitor");

var config  = getMyConfig('SwarmMonitor');

var redisClient = function(){
    return thisAdapter.nativeMiddleware.privateRedisClient;
};

var activeServers = {};
var activeServerLastChecked = {};
var cpuHistory = {};
var memoryHistory = {};

getCPULoadHistory = function(systemId) {
    return cpuHistory[systemId] ? cpuHistory[systemId] : [];
};

getMemoryLoadHistory = function(systemId) {
    return memoryHistory[systemId] ? memoryHistory[systemId] : [];
};

getActiveServers = function() {
    return activeServers;
};

updateSystemLoad = function(info) {
    //console.log("Update system load : %j",info);
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
            activeServers[status.systemId] = status.nodes;
            activeServerLastChecked[status.systemId] = new Date();
        } else {
            delete activeServers[status.systemId];
            delete activeServerLastChecked[status.systemId];
        }
        //console.log("Received notification for '%s' with status '%s'", status.systemId, status.alive ? 'alive' : 'dead');
    }
};

listSwarms = function(callBack){
    var redisKey = thisAdapter.nativeMiddleware.makeRedisKey("system","code");
    var result = redisClient().hkeys.async(redisKey);
    (function(result){
        callBack(null, result);
    }).swait(result);
};

loadSwarm = function(swarmName, callBack){
    var redisKey = thisAdapter.nativeMiddleware.makeRedisKey("system","code");
    var result = redisClient().hget.async(redisKey,swarmName);
    (function(result){
        callBack(null, result);
    }).swait(result);
};

//make ping request
function pingServers() {
    startSwarm("ping.js", "ping");
}

//check system load
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
    
    //check if any server died
    setInterval(function(){
        var now = moment();
        var serverKey;
        for (serverKey in activeServerLastChecked) {
            var lastCheck = activeServerLastChecked[serverKey];
            
            if (!lastCheck || now.diff(lastCheck) > 11000) {
                delete activeServerLastChecked[serverKey];
                delete activeServers[serverKey];
            }
        }
    },10000);
    
    /*listSwarms(function(err,result){
       console.log(err,result); 
    });*/
},2000);


/*
* cpu load: @for /f "skip=1" %p in ('wmic cpu get loadpercentage') do @echo %p%
* 
* 
* 
* */
