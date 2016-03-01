import GitRepository from './GitRepository';
import _ from 'lodash';
import schedule from 'node-schedule';

function key(repository) {
    return repository.branch + '#' + repository.path;
}


export default class Cache {

    constructor(projects, authors) {
        this.cache = {};

        _.forEach(projects, (project) => {
            _.forEach(project.repositories, repository => {
                let gitRepository = new GitRepository(repository, authors);
                this.cache[key(repository)] = {
                    repository: gitRepository,
                    history: gitRepository.getHistory()
                };
            });
        });

        // TODO changes could be incremental
        schedule.scheduleJob('*/30 * * * *', () => {
            this.reload();
        })

    }

    reload() {
        _.values(this.cache, (entry) => {
            entry.repository.getHistory().then(history => {
                entry.history = history;
            });
        });
    }

    getHistory(repository) {
        return Promise.resolve(this.cache[key(repository)].history /* Promise or History instance */);
    }

}
