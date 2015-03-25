/**
 * Created by salboaie on 3/24/15.
 */

var core = require ("../../../SwarmCore/lib/SwarmCore.js");

core.createAdapter("UsersManager");


var apersistence = require('apersistence');

apersistence.registerModel("DefaultUser","Redis", {
    ctor: function () {
        this.granted = false;
        this.rejected = false;
        this.modificationDate = new Date(Date.now());
    },
    userId: {
        type: "string",
        pk: true
    },
    userName: {
        type: "string"
    },
    organisationId:{
        type:"string",
        index :"true"
    }
});

apersistence.registerModel("Organisation","Redis", {
    ctor: function () {
    },
    organisationId: {
        type: "string",
        pk: true,
        index:true
    },
    displayName: {
        type: "string"
    }
});


createUser = function(organisationId, userId, callback){
    var user = redisPersistence.lookup.async("DefaultUser", userId.userId);
    (function(user){
        if(!redisPersistence.isFresh(user)){
            callback(new Error("User with identical id already exists"), null);
            return ;
        }
        user.organisationId = organisationId;
        redisPersistence.save(user);
        callback(null, user);
    }).swait(user);
}


updateUser = function(userJsonObj, callback){
    var user = redisPersistence.lookup.async("DefaultUser", userJsonObj.userId);
    (function(user){
        redisPersistence.externalUpdate(user, userJsonObj);
        redisPersistence.save(user);
        callback(null, user);
    }).swait(user);
}


queryUsers = function(organisationId, callback){
    var list  = redisPersistence.filter.async("DefaultUser", {"organisationId": organisationId});

    (function(list){
        callback(null,list);
    }).wait(list);
}

createOrganisation = function(organisationId, displayName, callback){
    var organisation = redisPersistence.lookup.async("Organisation", organisationId);
    (function(organisation){
        if(!redisPersistence.isFresh(organisation)){
            callback(new Error("Organisation with identical id already exists"), null);
            return ;
        }
        organisation.displayName = displayName;
        redisPersistence.save(organisation);
        callback(null, organisation);
    }).swait(organisation);
}

updateOrganisation = function(organisationDump, callback){
    var organisation = redisPersistence.lookup.async("DefaultUser", organisationDump.organisationId);
    (function(organisation){
        redisPersistence.externalUpdate(organisation, organisationDump);
        redisPersistence.save(organisation);
        callback(null, organisation);
    }).swait(organisation);
}


getOrganisations = function(callback){
    var list  = redisPersistence.filter.async("Organisation", null);

    (function(list){
        callback(null,list);
    }).wait(list);
}


function bootSystem(){
    var organisation = redisPersistence.lookup.async("Organisation", "SystemAdministrators");
    (function(organisation){
        if(redisPersistence.isFresh(organisation)){
            organisation.displayName = "System Administrators";
            redisPersistence.save(organisation);
        }
    }).wait(organisation);
}

registerResetCallback(function(){
    bootSystem();
})


