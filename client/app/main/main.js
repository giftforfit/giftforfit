'use strict';

angular.module('giftforfitApp')
  .config(function($stateProvider) {
    $stateProvider.state('main', {
      url: '/',
      views: {
        main: {
          templateUrl: 'app/main/main.html',
          controller: 'MyCtrl'
        },
        resolve: {
          auth: function($q, $location, OAuth) {
            var deferred = $q.defer();
            if (!OAuth.isAuthenticated()) {
              deferred.reject();
              $location.path('/login');
            } else {
              deferred.resolve();
            }
            return deferred.promise;
          }
        }

      },
      resolve: {}
    }).state('join', {
      url: '/join',
      views: {
        main: {
          templateUrl: 'app/main/main.html',
          controller: 'MyCtrl'
        }
      },
      resolve: {
        auth: function($q, $location, OAuth) {

          console.log('1');

          console.log('2');

          OAuth.popup('fitbit');

          //var deferred = $q.defer();
          //if (!OAuth.isAuthenticated()) {
          //  deferred.reject();
          //  $location.path('/login');
          //} else {
          //  deferred.resolve();
          //}
          //return deferred.promise;
        }
      }
    })
  });