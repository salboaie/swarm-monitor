/**
 *
 * @author Catalin Manolescu <cc.manolescu@gmail.com>
 */

var swarmDescription =
{
    meta:{
        name:"ping.js",
        debug:false
    },
    vars:{

    },
    ping:function(){
        this.broadcast('pingLauncher');
    },
    dispatch: function(systemStatus) {
        //console.log("dispatch status: %j", systemStatus);
        this.status = systemStatus || {};
        this.broadcast('notifyMonitor');
    },
    notifyMonitor:{
        node:"SwarmMonitor",
        code: function() {
            notifyStatusChanged(this.status);
        }
    },
    pingLauncher:{
        node:"Launcher",
        code : function (){
            this.status = getStatus();
            this.swarm("notifyMonitor");
        }
    }
};

swarmDescription;
