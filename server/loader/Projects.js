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
                key: key,
                name: this.projects[key].name,
                description: this.projects[key].description
            };
        });
    }

    getAllContributors() {
        let repositories = _.flatten(_.map(this.projects, 'repositories'));
        return this._getContributors(repositories);
    }

    getAllContributions() {
        let repositories = _.flatten(_.map(this.projects, 'repositories'));
        return this._getContributions(repositories);
    }

    getProjectContributors(projectKey) {
        return this._getContributors(this.projects[projectKey].repositories);
    }

    getProjectContributions(projectKey) {
        return this._getContributions(this.projects[projectKey].repositories);
    }

    _getContributions(repositories) {
        let promises = repositories.map((repository)=> {
            return new GitRepository(repository.path, repository.branch, this.authors).getHistory().then((history) => {
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

    _getContributors(repositories) {
        let promises = repositories.map((repository)=> {
            return new GitRepository(repository.path, repository.branch, this.authors).getHistory().then((history) => {
                return [...history.getContributors()];
            });
        });
        return Promise.all(promises).then((contributors) => {
            return contributors.reduce((memo, repoContributors) => {
                _.forEach(repoContributors, memo.add.bind(memo));
                return memo;
            }, new Set());
        }).then(contributors => [...contributors]);
    }
}