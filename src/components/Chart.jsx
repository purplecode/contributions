let _ = require('lodash');
let d3 = require('d3');
let React = require('react');
let ChartModel = require('./chart/ChartModel');
let ChartView = require('./chart/ChartView');

class Chart extends React.Component {

  renderChart(contributions) {
    if (_.isEmpty(contributions)) {
      return;
    }
    var element = this.refs.chartContainer.getDOMNode();
    let model = new ChartModel(contributions)
    new ChartView(element).render(model);
  }

  render() {
    return (
      <div className="chart" ref="chartContainer">
        {this.renderChart(this.props.contributions)}
      </div>
    )
  }
}

module.exports = Chart;