
'use strict';

SwarmMonitor.controller('OrganisationsController', ['$scope', '$state', '$rootScope','ngDialog',
    function($scope, $state, $rootScope, ngDialog) {
        $scope.organisations = [];
        
        $rootScope.onSwarmConnection(function () {
            swarmHub.startSwarm('Organisations.js', 'organisationsList');
        });
        swarmHub.on('Organisations.js','organisationsListDone', function (response) {

            $scope.organisations = response.organisationList;
            console.log("organisations",$scope.organisations, response);
            $scope.$apply();
        });


        swarmHub.on('Organisations.js','organisationCreationDone', function (response) {
            $scope.organisations.unshift(response.organisation);
            $scope.$apply();
        });

        $scope.selectOrganisation = function(event, organisation) {
            event.preventDefault();
            $scope.selectedOrganisation = organisation;
            swarmHub.startSwarm('UserCtrl.js', 'usersList',  $scope.selectedOrganisation.organisationId);
        };

        swarmHub.on('UserCtrl.js', 'usersListDone', function(swarm){
            $scope.users = swarm.userList;
            $scope.$apply();
        });

        $scope.addNewOrganisation = function(event) {
            console.log(event);
            ngDialog.open({
                    template: '<add-organisation> Expanding...</add-organisation>',
                    plain: true
                });


        $scope.addUser = function(event) {
                console.log(event);

                $scope.editUser = {
                    createNewUser:true
                }
                ngDialog.open({
                    template: '<edit-user> Expanding...</edit-user>',
                    plain: true
                });
            }

        $scope.editUser = function(event) {
                console.log(event);
                $scope.editUser = {
                    createNewUser:false
                }
                ngDialog.open({
                    template: '<edit-user> Expanding...</edit-user>',
                    plain: true
                });
            }
            //event.preventDefault();
        };
    }
]);
