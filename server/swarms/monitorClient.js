/**
 *
 * @author Catalin Manolescu <cc.manolescu@gmail.com>
 */

var swarmDescription =
{
    meta:{
        name:"monitorClient.js",
        debug:false
    },
    vars:{

    },
    activeServers:function(){
        this.swarm('getActiveServers');
    },
    loadHistory:function(systemId) {
        this.systemId = systemId;
        this.swarm('getLoadHistory');
    },
    systemLoad:function() {
        this.broadcast('getSystemLoad');
    },
    getActiveServers:{
        node:"SwarmMonitor",
        code: function() {
            this.serversInfo = getActiveServers();
            //console.log('active servers requested', this.serversInfo);
            this.home('done');
        }
    },
    getLoadHistory:{
        node:"SwarmMonitor",
        code: function() {
            this.cpuLoadHistory = getCPULoadHistory(this.systemId);
            this.memoryLoadHistory = getMemoryLoadHistory(this.systemId);
            this.home('loadDone');
        }
    },
    getSystemLoad:{
        node:"SystemAdapter",
        code:function (){
            var self = this;
            self.systemInfo = {
                systemId: systemId(),
                usedMemory: totalMemory() - freeMemory(),
                time: new Date()
            };
            var promise = cpuLoad.async();
            (function(result){
                self.systemInfo.cpuLoad = result;
                self.home('loadCheckDone');
            }).swait(promise);
        }
    }
};

swarmDescription;
