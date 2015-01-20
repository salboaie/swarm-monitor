/**
 *
 * @author Catalin Manolescu <cc.manolescu@gmail.com>
 */

var adapterPort         = 3000;
var adapterHost         = "localhost";
var nutil               = require('util');
var util                = require("../../../SwarmCore/nodeClient/nodeClient.js");
var assert              = require('assert');
var client              = util.createClient(adapterHost, adapterPort, "TestUser", "ok","genericTenant", "testCtor");
globalVerbosity = false;

var result = null;

swarmHub.startSwarm("systemInfo.js", "start");
swarmHub.on("systemInfo.js","done", function(response){
    result = response;
});

setTimeout (
    function(){
        console.log(result ? nutil.inspect(result.systemInfo, false, null) : null);
        console.log("Test uptime: " + process.uptime() );
        console.log("Memory usage: %j", process.memoryUsage() );
        setTimeout(function() {
            console.log("pid: " + process.pid);
            process.exit(1);
        },500);
    }, 2000);
