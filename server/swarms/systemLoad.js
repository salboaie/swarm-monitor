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
            var promise = cpuLoad.async();
            (function(result){
                self.systemInfo.cpuLoad = result;
                self.broadcast("notifyMonitor");
            }).swait(promise);

            //self.swarm("nodename", 'id intern adaptor');
            /*
            * thisadapter.nodeName
            * this.meta.outletId
            * */
            /*var stop = createSwarmCallback(function() {
                
            });
            
            setTimeout(stop, 60000);*/
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
