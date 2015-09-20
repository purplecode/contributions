import GitRepository from './GitRepository';
import _ from 'lodash';

export default class Repositories {
  constructor(repositories, authors) {
    this.repositories = repositories;
    this.authors = authors;
  }

  getTotalContributions() {
    let promises = Object.keys(this.repositories).map((name)=> {
      return new GitRepository(name, this.repositories[name], this.authors).getHistory().then((history) => {
        return history.getMonthlyContributions();
      });
    });
    return Promise.all(promises).then((history) => {
      return history.reduce((memo, repoContributions) => {
        _.forEach(repoContributions, function (userContributions, user) {
          _.forEach(userContributions, function (count, date) {
            memo[user] = memo[user] || {};
            memo[user][date] = (memo[user][date] || 0) + count;
          });
        });
        return memo;
      }, {});
    });
  }

  getContributions(repoName) {
    return new GitRepository(repoName, this.repositories[repoName], this.authors).getHistory().then((history) => {
      return history.getMonthlyContributions();
    });
  }
}