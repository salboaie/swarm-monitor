/**
 *
 * @author Catalin Manolescu <cc.manolescu@gmail.com>
 */
'use strict';

SwarmMonitor.controller('DashboardController', ['$scope', '$state', '$rootScope',
    function($scope, $state, $rootScope) {
        /* chart configurations */
        $scope.cpuHistoryChart = {
            categoryField: 'time',
            valueField: 'cpuLoad',
            category: {
                parseDates: true, // in order char to understand dates, we should set parseDates to true
                minPeriod: 'ss', // 'mm' for minute interval			 
                axisColor: '#DADADA',
                categoryBalloonDateFormat: 'JJ:NN:SS, DD MMMM'
            },
            value: {
                title: "CPU Load (in percent)"
            },
            graph: {
                type: 'line', // try to change it to "column"
                lineColor: '#3399FF'
            }
        };

        $scope.memoryHistoryChart = {
            categoryField: 'time',
            valueField: 'usedMemory',
            category: {
                parseDates: true, // in order char to understand dates, we should set parseDates to true
                minPeriod: 'ss', // 'mm' for minute interval			 
                axisColor: '#DADADA',
                categoryBalloonDateFormat: 'JJ:NN:SS, DD MMMM'
            },
            value: {
                title: "Used Memory (in bytes)"
            },
            graph: {
                type: 'line', // try to change it to "column"
                lineColor: '#d1cf2a'
            }
        };
        /* ... */

        $rootScope.onSwarmConnection(function(){
            swarmHub.startSwarm('monitorClient.js', 'activeServers');
            swarmHub.on('monitorClient.js', 'done', function(response){
                console.log(response.activeServers);
            });
        });
        
        var serverList = ['monitorServer','testServer'];
        $scope.activeServers = serverList;

        $scope.selectServer = function(event, server) {
            event.preventDefault();
            $scope.selectedServer = server;
        };
        
        var serverData = {
            monitorServer: {
                cpuHistory: mockup.cpuHistory.monitorServer,
                memoryHistory: mockup.memoryHistory.monitorServer,
                maxMemory: 8000
            },
            testServer: {
                cpuHistory: [],
                memoryHistory: mockup.memoryHistory.testServer,
                maxMemory: 8000
            }
        };
        
        $scope.serverData = serverData;
        $scope.pause = 0;
        
        var cpuHistoryLength = mockup.cpuHistory.testServer.length;
        setTimeout(function(){
            var cpuHistoryIndex = 0;
            var cpuInterval = setInterval(function(){
                if (cpuHistoryIndex < cpuHistoryLength) {
                    $scope.serverData.testServer.cpuHistory.push(mockup.cpuHistory.testServer[cpuHistoryIndex]);
                    cpuHistoryIndex++;
                    //console.log(cpuHistoryIndex, mockup.cpuHistory.testServer[cpuHistoryIndex-1]);
                } else {
                    clearInterval(cpuInterval);
                }
            },1000);
        },2000);
    }
]);
