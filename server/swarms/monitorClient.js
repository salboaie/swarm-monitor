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
    getActiveServers:{
        node:"SwarmMonitor",
        code: function() {
            this.activeServers = getActiveServers();
            console.log('active servers requested');
            this.home('done');
        }
    }
};

swarmDescription;
