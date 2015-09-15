require("babel/register");

var Repositories = require('./server/loader/Repositories');
var config = require('./server.config');

var repositories = new Repositories(config.REPOSITORIES, config.AUTHORS);

repositories.getMonthlyContributions().then(function (result) {
  console.log(result);
}).catch(function(e) {
  console.log(e);
  console.log(e.stack);
});

// wait for promise
require('express')().listen(3002);



