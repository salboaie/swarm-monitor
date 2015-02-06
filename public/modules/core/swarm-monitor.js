/**
 *
 * @author Catalin Manolescu <cc.manolescu@gmail.com>
 */
'use strict';

var SwarmMonitor = angular.module('SwarmMonitor', ['ngResource', 'ui.router', 'smart-table', 'growlNotifications', 'ngAnimate']);

SwarmMonitor.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {
        //configure http provider to support cross domain requests
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        
        function resetStateProvider() {
            //public routes
            $stateProvider
                .state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'modules/core/views/dashboard.html',
                    controller: 'DashboardController'
                })
                .state('swarms', {
                    url: '/swarms',
                    templateUrl: 'modules/core/views/swarms.html',
                    controller: 'SwarmsController'
                })
                .state('logs', {
                    url: '/logs',
                    templateUrl: 'modules/core/views/logs.html',
                    controller: 'LogsController'
                });

            $urlRouterProvider.otherwise('/dashboard');
        }

        resetStateProvider();
    }
]);

SwarmMonitor.run(['$rootScope', '$location', '$state', '$window',
    function ($rootScope, $location, $state, $window) {

    }
]);


SwarmMonitor.controller('BaseCtrl', ['$scope', '$rootScope', '$window',
    function ($scope, $rootScope, $window) {
        var swarmSystemAuthenticated = false;
        var swarmConnectionCallbacks = [];

        $rootScope.bytesFormat = function(bytes, precision) {
            if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
            if (typeof precision === 'undefined') precision = 1;
            var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
                number = Math.floor(Math.log(bytes) / Math.log(1024));
            return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
        };
        
        $rootScope.onSwarmConnection = function(callback) {
            if (swarmSystemAuthenticated) {
                callback();
            } else {
                if (callback) {
                    swarmConnectionCallbacks.push(callback);
                }
            }
        };

        //init swarm system connection
        var swarmClient = new SwarmClient("localhost", 8000, "TestUser", "ok", "swarmMonitor", "testCtor",
            function securityErrorFunction(err, data) {
                console.log('Swarm System [security error]:', err);
            }, function errorFunction(err) {
                console.log('Swarm System [error]:', err);
            });

        swarmHub.resetConnection(swarmClient);
        
        swarmHub.on("login.js", "success", function(){
            swarmSystemAuthenticated = true;
            for (var index in swarmConnectionCallbacks) {
                swarmConnectionCallbacks[index]();
            }
            swarmConnectionCallbacks = [];
            console.log("Swarm System: login success");
        });

        $rootScope.notifications = [];
    }
]);
