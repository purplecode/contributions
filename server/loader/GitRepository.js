import nodegit from 'nodegit';
import _ from 'lodash';
import History from './History';

var Repository = require("nodegit").Repository;

export default class GitRepository {
  constructor(name, path) {
    this.name = name;
    this.path = path;
  }

  getHistory() {
    return new Promise((resolve, reject) => {
      Repository.open(this.path)
        .then(function(repo) {
          return repo.getMasterCommit();
        })
        .then(function(firstCommitOnMaster) {
          let history = new History();
          let logs = firstCommitOnMaster.history();

          logs.on("commit", function(commit) {
            console.log("processing " + commit.sha());
            try {
              history.addCommit(commit.sha(), _.pick(commit.author(), ['name', 'email']), new Date(commit.date()), commit.message());
          });

          logs.on('end', function (commits) {
            resolve(history);
          });

          logs.on('error', function (error) {
            reject(error);
          });

          logs.start();
        }).catch(function(error) {
          reject(error);
        });
    });
  }
}






//
//Repository.open('d:/workspace/mint')
//  .then(function(repo) {
//    return repo.getMasterCommit();
//  })
//  .then(function(firstCommitOnMaster) {
//    var history = firstCommitOnMaster.history();
//
//    var count = 0;
//    history.on("commit", function(commit) {
//      if (++count >= 9) {
//        return;
//      }
//      console.log("commit " + commit.sha());
//
//      var author = commit.author();
//      console.log("Author:\t" + author.name() + " <" + author.email() + ">");
//      console.log("Date:\t" + commit.date());
//      console.log("\n    " + commit.message());
//    });
//
//    history.start();
//  }).catch(function(e) {
//    console.log('error', e);
//  });
//
//require('express')().listen(3000);