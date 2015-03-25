/**
 * Created by salboaie on 3/24/15.
 */


var UserCtrl =
{
    create:function(userId, organisation){
        this.userId = userId;
        this.organisation = organisation;
        this.swarm('createUser');
    },
    usersList:function(organisationId){
        this.organisationId = organisationId;
        this.swarm('usersList');
    },
    updateUser:function(organisationId, userJson){
        this.organisationId   = organisation;
        this.userJson       = userJson;
        this.swarm('updateUser');
    },
    createUser:{
        node:"UsersManager",
        code: function() {
            var user = createUser.async(this.organisation, this.userId);
            var self = this;
            (function(user){
                self.user = user;
                self.home("userCreationDone");
            }).swait(user);
        }
    },
    updateUser:{
        node:"UsersManager",
        code: function(){
            var user = updateUser.async(this.organisation, this.userJson);
            var self = this;
            (function(user){
                self.user = user;
                self.home("userUpdateDone");
            }).swait(user);
        }
    },
    usersList:{
        node:"UsersManager",
        code: function() {
            var userList = queryUsers.async(this.organisationId);
            var self = this;
            (function(userList){
                self.userList = userList;
                self.home("userListDone");
            }).swait(userList);
        }
    }
};

UserCtrl;
