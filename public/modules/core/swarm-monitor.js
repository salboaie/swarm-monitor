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

        $rootScope.bytesFormat = function (bytes, precision) {
            if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
            if (typeof precision === 'undefined') precision = 1;
            var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
                number = Math.floor(Math.log(bytes) / Math.log(1024));
            return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
        };

        $rootScope.timeFormat = function (value) {
            var sec_num = value;
                // in case of string value use: parseInt(value, 10); // don't forget the second param
            var tHours = Math.floor(sec_num / 3600);
            var days = Math.floor(tHours/24);
            var hours = tHours - days * 24;
            var minutes = Math.floor((sec_num - (tHours * 3600)) / 60);
            var seconds = sec_num - (tHours * 3600) - (minutes * 60);

            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            var time = '';
            if (days > 0) {
                time += days + 'd ';
            }
            
            if (hours > 0) {
                time += hours + 'h ';
            }
            
            if (minutes > 0) {
                time += minutes + 'm ';
            }
            
            time += Math.floor(seconds) + 's';
            
            return time;
        };

        $rootScope.onSwarmConnection = function (callback) {
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

        swarmHub.on("login.js", "success", function () {
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
