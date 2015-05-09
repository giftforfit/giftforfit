var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();
//api_key, api_secret, callbackURI, unit_system
var fitbitClient = require('fitbit-js')('9bd6df46e34a3e23a24d656a6f3c66ad', '8a359ac7e25425e749fd789b9a2eee82');
var app = express();

app.use(cookieParser('sess'));
app.use(bodyParser.json());
var token;

app.get('/', function(req, res) {
  fitbitClient.getAccessToken(req, res, function(error, newToken) {
    if (newToken) {
      console.log('got token');
      token = newToken;
      fitbitClient.apiCall('POST', '/user/-/activities/apiSubscriptions/320-activities.json', {token: token}, function(err, resp, json) {
        if (err) return res.send(err, 500);
        res.json(json);
      });
    }
  });
});

app.post('/activity-subscription', function(req, res) {
  //res.writeHead(200, {'Content-Type': 'text/html'});
  //res.end('<html>Now <a href="/subscribe">get stuff</a></html>');
  console.log('activity up  dated');
  //var activity = JSON.stringify(req.body, null, 2)[0];
  //console.log(activity);
  //console.log(activity.ownerId);

  var activity2 = JSON.parse(req.body);
  console.log(activity2);
  console.log(activity2[0].ownerId);

  var url = '/user/' + activity2.ownerId + '-/activities.json';
  fitbitClient.apiCall('GET', url, {token: token}, function(err, resp, json) {
    if (err) return res.send(err, 500);
    var json2 = JSON.stringify(req.body, null, 2);
    console.log('steps');
    console.log(json2);
    //res.json(json2);
  });

  //console.log(req.body);
  //console.log(JSON.stringify(req.body, null, 2));

  //console.log(JSON.stringify(req.body, null, 2));

  //fitbitClient.apiCall('post', '/1/user/-/apiSubscriptions/1.json', {}, function(req, res) {
  //  console.log(res);
  //});
});

var server = app.listen(appEnv.port, appEnv.bind, function() {
  console.log('Example app listening');
});
