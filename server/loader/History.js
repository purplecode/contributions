import _ from 'lodash';
import moment from 'moment';

export default class History {
    constructor() {
        this.data = [];
    }

    addCommit(hash, author, date, message, added, deleted) {
        this.data.push({
            hash: hash,
            author: author,
            date: date,
            message: message,
            lines: {
                added,
                deleted
            }
        });
    }

    getContributors() {
        return new Set(_.map(this.data, 'author'));
    }

    getMonthlyContributions() {
        return this.data.reduce((memo, commit) => {
            memo[commit.author] = memo[commit.author] || {};

            let month = moment(commit.date).format('YYYY-MM');

            let monthly = memo[commit.author][month] || {
                    commits: 0,
                    lines: {
                        added: 0,
                        deleted: 0,
                        delta: 0
                    }
                };

            monthly.commits += 1;

            monthly.lines.added += commit.lines.added;
            monthly.lines.deleted += commit.lines.deleted;
            monthly.lines.delta += (commit.lines.added - commit.lines.deleted);

            memo[commit.author][month] = monthly;

            return memo;
        }, {});
    }
}