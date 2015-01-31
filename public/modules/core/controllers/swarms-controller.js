/**
 *
 * @author Catalin Manolescu <cc.manolescu@gmail.com>
 */
'use strict';

SwarmMonitor.controller('SwarmsController', ['$scope', '$state', '$rootScope',
    function($scope, $state, $rootScope) {
        $scope.swarms = [];
        
        $rootScope.onSwarmConnection(function () {
            swarmHub.startSwarm('monitorClient.js', 'listSwarms');
        });
        swarmHub.on('monitorClient.js','listSwarmsDone', function (response) {
            $scope.swarms = response.swarmList;
            $scope.$apply();
        });
        
        swarmHub.on('monitorClient.js','loadSwarmDone', function (response) {
            if (response.swarmName == $scope.selectedSwarm) {
                $scope.swarmContent = response.swarmDescription;
            }
            $scope.$apply();
        });
        
        $scope.selectSwarm = function(event, swarm) {
            event.preventDefault();
            $scope.swarmContent = null;
            $scope.selectedSwarm = swarm;
            $rootScope.onSwarmConnection(function () {
                swarmHub.startSwarm('monitorClient.js', 'loadSwarm', swarm);
            });
        };

        
    }
]);
