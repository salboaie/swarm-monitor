/**
 *
 * Login swarm, Specific for USMED project
 */

/*
TODO: check to be clean in production, this is an ideal place where you can put a backdoor for your authentication
 */

var loginSwarming = {
    meta:{
        debug: false,
        name:"login.js"
    },
    vars:{
        authenticated:false
    },
    reconnectInSession:function(clientSessionId, userId, secretToken){
        this.authenticated              = false;
        this.setSessionId(clientSessionId);
        this.userId                     = userId;
        this.secretToken                = secretToken;
        this.swarm("reconnect");
    },
    testCtor:function(clientSessionId, userId, authorisationToken) {
        this.authenticated = false;
        this.setSessionId(clientSessionId);
        this.userId = userId;
        this.authorisationToken = authorisationToken;
        this.clientAdapter = thisAdapter.nodeName;

        if (authorisationToken == "ok") {
            this.authenticated = true;
            cprint("enabling... " + this.clientAdapter);
            this.swarm("enableSwarms", this.getEntryAdapter());
        } else {
            this.swarm("failed", this.getEntryAdapter());
            cprint("disabling... " + this.clientAdapter);
        }
    },
    reconnect:{   //add this new outlet in sessions
        node:"EntryPoint",
        code : function (){
            var outlets = sessionsRegistry.findOutletsForSession(this.getSessionId());
            for(var v in outlets){
                if(outlets[v].getSecret() == this.secretToken){
                    this.swarm("enableSwarm", this.getEntryAdapter());
                    return ;
                }
            }
            this.home("failed");
        }
    },
    failed:{   //phase
        node:"EntryPoint",
        code : function (){
            sessionsRegistry.disableOutlet(this.meta.outletId);
            logInfo("Failed login for " + this.userId );
            this.home("failed");
        }
    }, 
    enableSwarms: {   //phase that is never executed... given as documentation
        node:"EntryPoint",
        code : function (){
            var outlet = sessionsRegistry.getTemporarily(this.meta.outletId);
            sessionsRegistry.registerOutlet(outlet);
            enableOutlet(this);
            console.log("Success !");
            this.home("success");
        }
    }
};

loginSwarming;

