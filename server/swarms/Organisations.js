/**
 * Created by salboaie on 3/24/15.
 */


var organisationCtrl =
{
    create:function(organisationId, displayName){
        this.organisationId = organisationId;
        this.displayName    = displayName;
        this.swarm('createOrganisation');
    },
    organisationsList:function(){
        this.swarm('doOrganisationsList');
    },
    updateOrganisation:function(organisationJson){
        this.organisationJson       = organisationJson;
        this.swarm('updateOrganisation');
    },
    createOrganisation:{
        node:"UsersManager",
        code: function() {
            var organisation = createOrganisation.async(this.organisationId, this.displayName);
            var self = this;
            (function(organisation){
                self.organisation = organisation;
                self.home("organisationCreationDone");
            }).swait(organisation, function(err){
                    self.err = err;
                    self.home("creationFailed");
                });
        }
    },
    updateOrganisation:{
        node:"UsersManager",
        code: function(){
            var organisation = updateOrganisation.async(this.organisationJson);
            var self = this;
            (function(organisation){
                self.organisation = organisation;
                self.home("organisationUpdateDone");
            }).swait(organisation);
        }
    },
    doOrganisationsList:{
        node:"UsersManager",
        code: function() {
            var organisationList = getOrganisations.async();
            var self = this;
            (function(organisationList){
                self.organisationList = organisationList;
                self.home("organisationsListDone");
            }).swait(organisationList);
        }
    }
};

organisationCtrl;

