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
            this.systemInfo = {
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
            this.home("done");
        }
    }
};

swarmDescription;
