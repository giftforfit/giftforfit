var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
//api_key, api_secret, callbackURI, unit_system
var fitbitClient = require('fitbit-js')('9bd6df46e34a3e23a24d656a6f3c66ad', '8a359ac7e25425e749fd789b9a2eee82', 'http://localhost:3000');
var app = express();

app.use(cookieParser('sess'));
app.use(bodyParser.json());
var token;

app.get('/', function(req, res) {
  fitbitClient.getAccessToken(req, res, function(error, newToken) {
    if (newToken) {
      token = newToken;
      //res.redirect('/subscribe');
      //res.writeHead(200, {'Content-Type': 'text/html'});
      //res.end('<html>Now <a href="/subscribe">get stuff</a></html>');

      fitbitClient.apiCall('POST', '/user/-/apiSubscriptions/320.json', {token:token}, function(req, res) {
        console.log('\n');
        console.log(res);
      });
    }
  });
});

app.get('/subscribe', function(req, res) {
  //fitbitClient.apiCall('post', '/1/user/-/apiSubscriptions/1.json', {}, function(req, res) {
  //  console.log(res);
  //});
});

var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);

});
