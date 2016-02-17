import nodegit from 'nodegit';
import _ from 'lodash';
import History from './History';

export default class GitRepository {
  constructor(path, authors) {
    this.path = path;
    this.authors = authors;
  }

  getHistory() {
    return new Promise((resolve, reject) => {
      nodegit.Repository.open(this.path)
        .then((repo) => {
          return repo.getMasterCommit();
        })
        .then((firstCommitOnMaster) => {
          let history = new History();
          let logs = firstCommitOnMaster.history();

          logs.on("commit", (commit) => {
            let author = this.authors.getId(commit.author().name(), commit.author().email());
            let commitDate = new Date(commit.date());
            if(commitDate > new Date(new Date().getTime() - 1000*60*60*24*365)) {
              history.addCommit(commit.sha(), author, commitDate, commit.message());
            }
          });

          logs.on('end', ()  => {
            resolve(history);
          });

          logs.on('error', (error) => {
            reject(error);
          });

          logs.start();
        }).catch((error)  => {
          reject(error);
        });
    });
  }
}
