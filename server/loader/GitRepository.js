import nodegit from 'nodegit';
import _ from 'lodash';
import History from './History';

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
                status.commits++;

                this.__getLineStats(commit).then(({added, deleted}) => {
                    let author = this.authors(commit.author().name(), commit.author().email());
                    let date = new Date(commit.date());

                    if (!this.repository.filter || this.repository.filter(commit)) {
                        history.addCommit(commit.sha(), author, date, commit.message(), added, deleted);
                    }

                    status.commits--;
                    tryResolve();
                }).catch(reject);
            });

            logs.on('end', () => {
                status.exit = true;
                tryResolve();
            });

            logs.on('error', reject);

            logs.start();
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

