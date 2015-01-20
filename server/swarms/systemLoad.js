/**
 *
 * @author Catalin Manolescu <cc.manolescu@gmail.com>
 */

var swarmDescription =
{
    meta:{
        name:"systemLoad.js",
        debug:false
    },
    vars:{

    },
    start:function(){
        this.broadcast("getSystemLoad");
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
            self.broadcast("notifyMonitor");
            /*var totalLoad = cpuLoad.async();
             (function(totalLoad){
             self.systemInfo.cpuLoad = totalLoad;
             self.home("done");
             }).wait(totalLoad);*/
        }
    },
    notifyMonitor:{
        node:"SwarmMonitor",
        code:function() {
            updateSystemLoad(this.systemInfo);
            //this.home("done");
        }
    }
};

swarmDescription;
