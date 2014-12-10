// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var AWS = require('aws-sdk'); 

AWS.config.region = 'us-east-1'
var sqs = new AWS.SQS();

var queueUrl = 'https://sqs.us-east-1.amazonaws.com/854757141155/tictactoe';

app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// set routes
app.get('/tictactoe/recordplayermark', function(req, res) {
  
  var params = {
    MessageBody: JSON.stringify({ command : "RecordPlayerMark", data: req.query }), /* required */
    QueueUrl: queueUrl, /* required */
    DelaySeconds: 0
  };

  sqs.sendMessage(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });

  res.send('received')
});

app.get('/tictactoe/recordoutcome', function(req, res) {
  
  var params = {
    MessageBody: JSON.stringify({ command : "RecordOutcome", data: req.query }), /* required */
    QueueUrl: queueUrl, /* required */
    DelaySeconds: 0
  };

  sqs.sendMessage(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });

  res.send('received')
});

// Set server port
app.listen(4000);
console.log('server is running');
