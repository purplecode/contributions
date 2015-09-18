import nodegit from 'nodegit';
import _ from 'lodash';
import History from './History';

export default class GitRepository {
  constructor(name, path, authors) {
    this.name = name;
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
            history.addCommit(commit.sha(), author, new Date(commit.date()), commit.message());
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
