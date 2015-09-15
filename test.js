require("babel/register");

var Loader = require('./server/loader/Loader');
var Config = require('./server.config');

var loader = new Loader(Config.Repositories, Config.Authors);

loader.getMonthlyContributions().then(function (result) {
  console.log(result);
}).catch(function(e) {
  console.log(e);
  console.log(e.stack);
});

// wait for promise
require('express')().listen(3002);



