require("babel/register");

var GitRepository = require('./server/loader/GitRepository');
var Config = require('./server.config');

var repo = new GitRepository('mint', '.', Config.Authors);

repo.getHistory().then(function (history) {
  console.log(history.getMonthlyContributions());
}).catch(function(e) {
  console.log(e);
  console.log(e.stack);
});

// wait for promise
require('express')().listen(3002);



