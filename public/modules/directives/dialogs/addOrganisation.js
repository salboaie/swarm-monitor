
'use strict';

SwarmMonitor.directive('addOrganisation', [function() {
    
    var controller = ['$scope', '$state', '$rootScope', '$element',
        function($scope, $translate, $state, $rootScope, $element){
            $scope.organisationId = "ORG"
            $scope.displayName = "no name";
            $scope.status  = "";

            $scope.checkInput = function(){
                swarmHub.startSwarm('Organisations.js', 'create', $scope.organisationId, $scope.displayName);
                $scope.status = 'Saving...';
            }

            function closeMe(){
                $scope.closeThisDialog('Created...');
                swarmHub.off('Organisations.js', 'organisationCreationDone', closeMe);
            }

            swarmHub.on('Organisations.js', 'organisationCreationDone', closeMe);

            function creationFailed(swarm){
                $scope.status = "Organisation id \'" + $scope.organisationId +"\' already exists or is invalid! Try another!";
                $scope.$apply();
            }
            swarmHub.on('Organisations.js', 'creationFailed', creationFailed);


        }];

    return {
        replace: true,
        templateUrl: 'modules/directives/dialogs/addOrganisation.html',
        restrict: 'E',
        controller: controller
    }
}]);
