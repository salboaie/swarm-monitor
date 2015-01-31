/*
 Simple logger implementation
 */
var fs = require('fs');
var core = require("../../../SwarmCore/lib/SwarmCore.js");
thisAdapter = core.createAdapter("Logger");

doLog = function (level, nodeName, message) {
    //console.log(level, nodeName, message);
    //localLog("NetworkLog",message);
};

getNodeId = function() {
 return thisAdapter.nodeName;
};

listFiles = function () {
 return fs.readdirSync(getSwarmFilePath(thisAdapter.config.logsPath));
};

readContent = function(fileName) {
 var content = fs.readFileSync(getSwarmFilePath(thisAdapter.config.logsPath) + '/' + fileName, 'base64');
 return content;
};
