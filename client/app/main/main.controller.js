'use strict';
angular.module('giftforfitApp').
  controller('MyCtrl', function($scope, $http, $modal, $rootScope) {
    $scope.open = function(size) {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'myModalContent.html',
        size: size,
        resolve: {
          items: function() {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function(selectedItem) {
        $scope.selected = selectedItem;
      }, function() {
        //$log.info('Modal dismissed at: ' + new Date());
      });
    }
  }
).value('duScrollOffset', 30);