
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

        swarmHub.on('UserCtrl.js', 'userListDone', function(swarm){
            $scope.users = swarm.userList;
            $scope.$apply();
        });

        swarmHub.on('UserCtrl.js', 'userCreationDone', function(swarm){
            $scope.users.unshift(swarm.user);
            $scope.$apply();
        });

        swarmHub.on('UserCtrl.js', 'userDeleted', function(swarm){
            $scope.users = $scope.users.filter(function(el){
                return el.userId !== swarm.user.userId;
            });
            $scope.$apply();
        });


        $scope.addUser = function(event) {
            $scope.currentUser = null;
            ngDialog.open({
                template: '<edit-user> Expanding...</edit-user>',
                plain: true,
                scope: $scope
            });
        }


        $scope.deleteOrganisation = function(event) {
            swarmHub.startSwarm('Organisations.js','delete',  $scope.selectedOrganisation.organisationId);
            $scope.organisations = $scope.organisations.filter(function(item){
                return item.organisationId !== $scope.selectedOrganisation.organisationId;
            });
            $scope.selectedOrganisation = null;
        }



        $scope.addNewOrganisation = function(event) {

            ngDialog.open({
                template: '<add-organisation> Expanding...</add-organisation>',
                plain: true
            });
        }

        $scope.editUser = function(event, user) {
                console.log(user);
                $scope.currentUser = user;

                ngDialog.open({
                    template: '<edit-user> Expanding...</edit-user>',
                    plain: true,
                    scope: $scope
                });
            }
            //event.preventDefault();
        }

]);
