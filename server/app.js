var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var chalk = require('chalk');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static('client'));
app.use('/', express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    // Disable caching so we'll always get the latest.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use('/api/buildings', require('./router'));

app.listen(app.get('port'), function() {
  console.log(chalk.magenta('Server is loving you hard on: http://localhost:' + app.get('port') + '/'));
});

