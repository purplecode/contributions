import GitRepository from './GitRepository';
import _ from 'lodash';

export default class Projects {
  constructor(projects, authors) {
    this.projects = projects;
    this.authors = authors;
  }

  getProjectDefinitions() {
    return _.keys(this.projects).map((key) => {
      return {
        key : key,
        name: this.projects[key].name,
        description: this.projects[key].description
      };
    });
  }

  getTotalContributions() {
    let repositories = _.flatten(_.pluck(this.projects, 'repositories'));
    return this._getContributions(repositories);
  }

  getProjectContributions(projectKey) {
    return this._getContributions(this.projects[projectKey].repositories);
  }

  _getContributions(repositories) {
    let promises = repositories.map((repository)=> {
      return new GitRepository(repository.path, this.authors).getHistory().then((history) => {
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
}