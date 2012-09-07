/* 
  Node.js, express, oauth example using Twitters API
  
  Install Node.js: http://nodejs.org/
  
  Install Dependencies:
      npm install express
      npm install oauth
  
  Create App File:
      Save this file to server.js
  
  Start Server:
      node server.js
  
  Navigate to the page:
      Local host: http://127.0.0.1:8080
      Remote host: http://yourserver.com:8080
*/

var express = require('express');
var util = require('util');
var oauth = require('oauth');

var app = express();

// Get your credentials here: https://dev.twitter.com/apps
var _twitterConsumerKey = "g7K1fRiCkGKLEVIkqN9Sw";
var _twitterConsumerSecret = "CEmPt44yIxxzK0KAsttx8dXrIngOhKZgvJFazmWdgg";

var consumer = new oauth.OAuth(
                "https://twitter.com/oauth/request_token", 
                "https://twitter.com/oauth/access_token", 
                _twitterConsumerKey, 
                _twitterConsumerSecret, 
                "1.0A", 
                "http://172.27.64.199:8080/tw/sessions/callback", 
                "HMAC-SHA1"
              );

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.logger());
    app.use(express.cookieParser());
    app.use(express.session({ secret: "very secret" }));
});

app.locals({
    session: function(req, res){
        return req.session;
    }
});

app.get('/tw/sessions/connect', function(req, res){
  consumer.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
    if (error) {
      res.send("Error getting OAuth request token : " + util.inspect(error), 500);
    } else {  
      req.session.oauthRequestToken = oauthToken;
      req.session.oauthRequestTokenSecret = oauthTokenSecret;
      res.redirect("https://twitter.com/oauth/authorize?oauth_token="+req.session.oauthRequestToken);      
    }
  });
});

app.get('/tw/sessions/callback', function(req, res){

  util.puts(">>"+req.session.oauthRequestToken);
  util.puts(">>"+req.session.oauthRequestTokenSecret);
  util.puts(">>"+req.query.oauth_verifier);
  consumer.getOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret, req.query.oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
    if (error) {
      res.send("Error getting OAuth access token : " + util.inspect(error) + "["+oauthAccessToken+"]"+ "["+oauthAccessTokenSecret+"]"+ "["+util.inspect(results)+"]", 500);
    } else {
      req.session.oauthAccessToken = oauthAccessToken;
      req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
      
      res.redirect('/tw');
    }
  });
});

app.get('/tw', function(req, res){
    consumer.get("http://twitter.com/account/verify_credentials.json", req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function (error, data, response) {
        if (error) {
            res.redirect('/tw/sessions/connect');
            // res.send("Error getting twitter screen name : " + util.inspect(error), 500);
        } else {
            var parsedData = JSON.parse(data);    
            res.send('{ "response": "success", "access_token": "' + req.session.oauthAccessToken + '", "token_secret": "' + req.session.oauthAccessTokenSecret + '" }');
        } 
    });
});

app.get('/home', function(req, res){
    res.send('<p>NearMe OAuth Webservice 2012</p> <h2>Supported:</h2> <ul><li><a href="/tw">twitter</a></li></ul>');
});

app.get('*', function(req, res){
    res.redirect('/home');
});

app.listen(8080);