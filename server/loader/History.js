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
    return data.reduce((memo, entry) => {
      let month = date.getYear() + '-' + date.getMonth();
      memo[author] = memo[author] || {};
      memo[author][month] = (memo[author][month] || 0) + 1;
      return memo;
    }, {});
  }
}