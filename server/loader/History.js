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

  getMonthlyContributions() {
    return this.data.reduce((memo, entry) => {
      let month = moment(entry.date).format('YYYY-MM');
      let author = entry.author.email;
      memo[author] = memo[author] || {};
      memo[author][month] = (memo[author][month] || 0) + 1;
      return memo;
    }, {});
  }
}