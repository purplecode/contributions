require("babel/register");

var GitRepository = require('./server/loader/GitRepository');

var repo = new GitRepository('mint', '.');

repo.getHistory().then(function (history) {
  console.log(history.getMonthlyContributions());
}).catch(function(e) {
  console.log(e);
  console.log(e.stack);
});

// wait for promise
require('express')().listen(3002);



