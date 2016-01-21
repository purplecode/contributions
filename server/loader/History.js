import _ from 'lodash';
import moment from 'moment';

export default class History {
  constructor() {
    this.data = [];
  }

  addCommit(hash, author, date, message) {
    this.data.push({
      hash: hash,
      author: author,
      date: date,
      message: message
    });
  }

  getContributors() {
    return new Set(_.map(this.data, 'author'));
  }

  getMonthlyContributions() {
    return this.data.reduce((memo, entry) => {
      let month = moment(entry.date).format('YYYY-MM');
      memo[entry.author] = memo[entry.author] || {};
      memo[entry.author][month] = (memo[entry.author][month] || 0) + 1;
      return memo;
    }, {});
  }
}