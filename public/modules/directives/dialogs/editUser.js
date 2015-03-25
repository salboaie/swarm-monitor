
'use strict';

SwarmMonitor.directive('editUser', [function() {
    
    var controller = ['$scope', '$state', '$rootScope', '$element',
        function($scope, $translate, $state, $rootScope, $element){
            $scope.userId = ""
            $scope.name   = "Anonymous";
            $scope.status  = "";

            $scope.checkInput = function(){
                swarmHub.startSwarm('UserCtrl.js', 'create', $scope.organisationId, $scope.name);
                $scope.status = 'Saving...';
            }

            function closeMe(){
                $scope.closeThisDialog('Created...');
                swarmHub.off('UserCtrl.js', 'saveDone', closeMe);
            }

            swarmHub.on('UserCtrl.js', 'saveDone', closeMe);

        }];

    return {
        replace: true,
        templateUrl: 'modules/directives/dialogs/editUser.html',
        restrict: 'E',
        controller: controller
    }
}]);
