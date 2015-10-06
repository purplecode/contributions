let _ = require('lodash');
let d3 = require('d3');
let Colors = require('../../constants/Colors');

export default class ChartModel {
  constructor(contributions) {
    this.contributions = contributions;
  }

  _parseDate(date) {
    return d3.time.format("%Y-%m").parse(date);
  }

  getXValues() {
    let distinct = _.values(this.contributions).reduce((memo, item) => {
      _.keys(item).forEach(memo.add.bind(memo));
      return memo;
    }, new Set());
    return [...distinct].sort();
  }

  getXDomain() {
    let dates = this.getXValues();
    return [this._parseDate(dates[0]), this._parseDate(dates[dates.length - 1])];
  }

  getYDomain() {
    let shifts = {};
    _.mapValues(this.contributions, (contributor) => {
      _.mapKeys(contributor, (count, date) => {
        shifts[date] = (shifts[date] || 0) + (count || 0);
      });
    });
    return [0, _.max(_.values(shifts))];
  }

  getColor(name) {
    return Colors.getColor(name);
  }

  getSeriesNames() {
    return Object.keys(this.contributions);
  }

  getSeriesData() {
    let dates = this.getXValues(this.contributions);
    let shifts = {};
    return this.getSeriesNames().map((contributor) => {
      return {
        name: contributor,
        values: dates.map((date) => {
          let y0 = (shifts[date] || 0);
          let y1 = y0 + (this.contributions[contributor][date] || 0);
          shifts[date] = y1;
          return {
            date: this._parseDate(date),
            y0: y0,
            y: y1
          };
        })
      }
    });
  }
}