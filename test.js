require("babel/register");

var GitRepository = require('./server/loader/GitRepository');

var repo = new GitRepository('mint', '../mint');

repo.getHistory().then(function (history) {
  console.log(history);
});

// wait for promise
require('express')().listen(3002);



