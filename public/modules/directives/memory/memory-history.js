/**
 *
 * @author Catalin Manolescu <cc.manolescu@gmail.com>
 */
'use strict';

SwarmMonitor.directive('memoryHistory', [function() {

    var controller = ['$scope', '$state', '$rootScope', '$element',
        function($scope, $translate, $state, $rootScope, $element){
            
        }];

    return {
        replace: true,
        templateUrl: 'modules/directives/memory/memory-history.html',
        restrict: 'E',
        scope: {
            config: '=config',
            data: '=data',
            availableMemory: '=availableMemory'
        },
        controller: controller
    }
}]);
