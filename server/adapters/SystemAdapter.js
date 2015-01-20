/**
 *
 * @author Catalin Manolescu <cc.manolescu@gmail.com>
 */

var core = require ("../../../SwarmCore/lib/SwarmCore.js");
var os = require('os');
var winCPU = require('windows-cpu');
thisAdapter = core.createAdapter("SystemAdapter");

var config = getMyConfig("SystemAdapter");
var serverId = config.systemId;

/**
 * System identification value.
 */
systemId = function() {
    return getMyConfig("systemId");
};

/**
 * Returns the hostname of the operating system.
 */
hostName = function() {
    return os.hostname();
};

/**
 * Returns the operating system name.
 */
systemType = function() {
    return os.type();
};

/**
 * Returns the operating system platform.
 */
platform = function() {
    return os.platform();
};

/**
 * Returns the operating system CPU architecture.
 */
architecture = function() {
    return os.arch();
};

/**
 * Returns the system uptime in seconds.
 */
uptime = function() {
    return os.uptime();
};

/**
 * Returns the total amount of system memory in bytes.
 */
totalMemory = function() {
    return os.totalmem();
};

/**
 * Returns the amount of free system memory in bytes.
 */
freeMemory = function() {
    return os.freemem();
};

/**
 * Returns an array of objects containing information about each CPU/core installed: 
 * model, speed (in MHz), and times (an object containing the number of milliseconds 
 * the CPU/core spent in: user, nice, sys, idle, and irq)
 */
cpus = function() {
    return os.cpus(); 
};

/**
 * Returns the list of cpu load in percent.
 */
cpuLoad = function(callback) {
   /* var promise = winCPU.totalLoad.async();
    (function(error, result){
        console.log('errors: %j', error);
        console.log('result: %j', result);

        return result;
    }).wait(promise);*/
    
    /*var totalLoad = null;
    winCPU.totalLoad(function(error, result){
        console.log('errors: %j', error);
        console.log('result: %j', result);

        totalLoad = result;
    });

    var interval = setInterval(function(){
        if (totalLoad) {
            clearInterval(interval);
            return totalLoad;
        }
    },50);*/
    winCPU.totalLoad(function(error, result){
        console.log('errors: %j', error);
        console.log('result: %j', result);

        callback(result);
    });
};
