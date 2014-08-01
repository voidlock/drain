var express = require('express'),
    app = express();

function log_body(body) {
  if (process.env.LOG_BODY) {
    console.log(body);
  }
}

function log_headers(req, headers) {
  if (process.env.LOG_HEADERS) {
    var interested = headers.reduce(function(str, key) {
      str += "\n" + key + ": " + req.get(key);
      return str;
    }, '');
    console.log("\n", interested, "\n");
  }
}

function body_parser(req, res, next) {
  if (!req.is('application/logplex-1')) {
    res.send(500, 'invalid');
    return;
  }

  req.logplexLogs = '';
  req.setEncoding('utf8');
  req.on('data', function (chunk) {
    req.logplexLogs += chunk;
  });
  req.on('end', next);
}

app.use(body_parser);

app.post('/logs', function(req, res) {
  log_headers(req, ['Host', 'Con' ,'Content-Type' ,'Logplex-Msg-Count' ,'Logplex-Frame-Id' ,'Logplex-Drain-Token' ,'User-Agent' ,'Content-Length' ,'Connection']);
  log_body(req.logplexLogs);
  res.send(201);
});

var server = app.listen(3000, function () {
  console.log('Listening on port %d', server.address().port);
});
