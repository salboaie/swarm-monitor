/**
 *
 * @author Catalin Manolescu <cc.manolescu@gmail.com>
 */
'use strict';

SwarmMonitor.directive('cpuHistory', [function() {

    var controller = ['$scope', '$state', '$rootScope', '$element',
        function($scope, $translate, $state, $rootScope, $element){
            
        }];

    return {
        replace: true,
        templateUrl: 'modules/directives/cpu/cpu-history.html',
        restrict: 'E',
        controller: controller
    }
}]);
