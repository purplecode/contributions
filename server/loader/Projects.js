import _ from 'lodash';
import Cache from './Cache';

export default class Projects {
    constructor(projects, authors) {
        this.projects = projects;
        this.cache = new Cache(projects, authors);
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
            return this.cache.getHistory(repository).then((history) => {
                return history.getMonthlyContributions();
            });
        });
        return Promise.all(promises).then((history) => {
            return history.reduce((memo, repoContributions) => {
                _.forEach(repoContributions, function (userContributions, user) {
                    _.forEach(userContributions, function (stats, date) {
                        memo[user] = memo[user] || {};

                        let monthly = memo[user][date] || {
                                commits: 0,
                                lines: {
                                    added: 0,
                                    deleted: 0,
                                    delta: 0
                                }
                            };

                        monthly.commits += stats.commits;
                        monthly.lines.added += stats.lines.added;
                        monthly.lines.deleted += stats.lines.deleted;
                        monthly.lines.delta += stats.lines.delta;

                        memo[user][date] = monthly;
                    });
                });
                return memo;
            }, {});
        });
    }

    _getContributors(repositories) {
        let promises = repositories.map((repository)=> {
            return this.cache.getHistory(repository).then((history) => {
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