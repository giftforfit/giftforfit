'use strict';

angular.module('giftforfitApp', [
  'oauth.io',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
  'ngMessages',
  'duScroll',
  'ngTouch',
  'restangular'
]).config(function($stateProvider, $urlRouterProvider, $locationProvider, OAuthProvider) {
  $urlRouterProvider.otherwise('/');
  OAuthProvider.setPublicKey('N1LHd6CFEmRJ-8qXi-3PBfO_CXk');
  OAuthProvider.setHandler('fitbit', function() {
    alert('Thank you, You are subscribed!');
  });
  $locationProvider.html5Mode(true);
}).run(function($modal) {
});
