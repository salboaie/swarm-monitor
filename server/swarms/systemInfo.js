/**
 *
 * @author Catalin Manolescu <cc.manolescu@gmail.com>
 */

var swarmDescription =
{
    meta:{
        name:"systemInfo.js",
        debug:false
    },
    vars:{

    },
    start:function(){
        this.swarm("getSystemInfo");
    },
    getSystemInfo:{ 
        node:"SystemAdapter",
        code : function (){
            var self = this;
            self.systemInfo = {
                systemId: systemId(),
                hostName: hostName(),
                type: systemType(),
                platform: platform(),
                architecture: architecture(),
                uptime: uptime(),
                totalMemory: totalMemory(),
                freeMemory: freeMemory(),
                cpus: cpus()
            };
            self.home("done");
            /*var totalLoad = cpuLoad.async();
            (function(totalLoad){
                self.systemInfo.cpuLoad = totalLoad;
                self.home("done");
            }).wait(totalLoad);*/
        }
    }
};

swarmDescription;
