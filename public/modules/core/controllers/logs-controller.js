/**
 *
 * @author Catalin Manolescu <cc.manolescu@gmail.com>
 */
'use strict';

SwarmMonitor.controller('LogsController', ['$scope', '$state', '$rootScope',
    function($scope, $state, $rootScope) {
        var logFiles = [
            {name:'ClientAdapter', type:'err',servers:['server 1']},
            {name:'Launcher', type:'err',servers:['server 1', 'server 2']}
        ];
        
        $scope.logFiles = logFiles;
        
        $scope.loadFile = function(event, item, serverName) {
            $scope.logContent = '';
            $scope.selectedFile = item;
            $scope.selectedServer = serverName;
            
            $scope.logContent = atob(mockup.logContent);
        }
    }
]);
