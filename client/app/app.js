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
    //console.log(OAuthData.result.access_token, OAuthData);
    console.log('hello');
    //$http.get('https://graph.facebook.com/me?access_token=' + OAuthData.result.access_token)
    //  .then(function(resp) {
    //    console.log(resp);
  });
  //  });

  $locationProvider.html5Mode(true);
}).run(function(Restangular) {
});
