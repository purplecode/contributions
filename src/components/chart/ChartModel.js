let _ = require('lodash');
let d3 = require('d3');

let color = d3.scale.category20();

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
    let palette = [
      '#F34235',
      '#E81D62',
      '#9B26AF',
      '#6639B6',
      '#3E50B4',
      '#2095F2',
      '#009587',
      '#00BBD3',
      '#02A8F3',
      '#4BAE4F',
      '#8AC249',
      '#CCDB38',
      '#FEEA3A',
      '#FEC006',
      '#FE9700',
      '#FE5621',
      '#785447',
      '#9D9D9D',
      '#5F7C8A'
    ];
    let idx = this.getSeriesNames().indexOf(name);
    return palette[idx % palette.length];
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