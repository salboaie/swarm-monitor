/**
 *
 * @author Catalin Manolescu <cc.manolescu@gmail.com>
 */
'use strict';

var SwarmMonitor = angular.module('SwarmMonitor', ['ngResource', 'ui.router']);

SwarmMonitor.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {
        //init swarm system connection
        var swarmClient = new SwarmClient("localhost", 8000, "TestUser", "ok", "swarmMonitor", "testCtor",
            function securityErrorFunction(err, data) {
                console.log('Swarm System [security error]:', err);
            }, function errorFunction(err) {
                console.log('Swarm System [error]:', err);
            });

        swarmHub.resetConnection(swarmClient);

        swarmHub.on("login.js", "success", function(){
            console.log("Swarm System: login success")
        });


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

            /*
             $stateProvider
             .state('map.streetView', {
             url: '/streetView',
             template: '<street-view></street-view>'
             })
             .state('map.profile', {
             url: '/profile',
             template: '<user-profile></user-profile>'
             });
             */


        }

        resetStateProvider();
    }
]);

SwarmMonitor.run(['$rootScope', '$location', '$state', '$window',
    function ($rootScope, $location, $state, $window) {

    }
]);


SwarmMonitor.controller('BaseCtrl', ['$scope', '$window',
    function ($scope, $window) {
        console.log('CONTROLLER');
        /*var client = new SwarmClient("localhost", 3000,
         "testUser", "ok", "testTenant", "testCtor",
         function securityErrorFunction(err){
         console.log(err);
         }, function errorFunction(err){
         console.log(err);
         });

         swarmHub.resetConnection(client);

         swarmHub.on("login.js", "success", function(){
         console.log("Test success")
         });

         swarmHub.on("login.js", "fail", function(){
         console.log("Test failed")
         });*/

    }
]);
