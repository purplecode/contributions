import nodegit from 'nodegit';
import _ from 'lodash';
import History from './History';
import Forks from './Forks';

const NUMBER_OF_FORKS = 4;

export default class GitRepository {
    constructor(repository, authors) {
        this.repository = repository;
        this.authors = authors;
    }

    getHistory() {
        return nodegit.Repository.open(this.repository.path)
            .then((repo) => {
                return repo.getBranchCommit(this.repository.branch || 'master');
            })
            .then(this.__getHistory.bind(this));
    }

    __getHistory(branch) {
        /**
         * Initially, it was a reusable pool of forks, but nodegit has some memory leaks while fetching diffs.
         */
        let forks = new Forks(NUMBER_OF_FORKS, 'Fork.js');

        return new Promise((resolve, reject) => {
            let history = new History();
            let logs = branch.history();

            let status = {
                commits: 0,
                exit: false
            };

            function tryResolve() {
                if (status.commits === 0 && status.exit) {
                    resolve(history);
                }
            }

            logs.on("commit", (commit) => {
                if (!this.repository.filter || this.repository.filter(commit)) {
                    status.commits++;

                    let author = this.authors(commit.author().name(), commit.author().email());
                    let date = new Date(commit.date());

                    forks.process({
                        repository: this.repository.path,
                        oid: commit.sha()
                    }).then(({added, deleted}) => {
                        history.addCommit(commit.sha(), author, date, commit.message(), added, deleted);
                        status.commits--;
                        tryResolve();
                    }).catch(reject);
                }
            });

            logs.on('end', () => {
                status.exit = true;
                tryResolve();
            });

            logs.on('error', reject);

            logs.start();
        }).then(response => {
            /* finally is still not a standard  */
            forks.kill();
            return response;
        });
    }

    __getLineStats(commit) {
        let lines = {
            added: 0,
            deleted: 0
        };
        return commit.getDiff().then((diffs) => {
            return Promise.all(diffs.map((diff)=> {
                return diff.patches().then(function (patches) {
                    patches.forEach(function (patch) {
                        let stats = patch.lineStats();
                        lines.added += stats.total_additions;
                        lines.deleted += stats.total_deletions;
                    });
                });
            }));
        }).then(() => {
            return lines;
        });
    }
}

