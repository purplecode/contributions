let _ = require('lodash');
let d3 = require('d3');
let React = require('react');
let LinearProgress = require('material-ui/lib/linear-progress');
let ChartModel = require('./chart/ChartModel');
let ChartView = require('./chart/ChartView');

class Chart extends React.Component {

  renderChart(contributions) {
    if(!_.isEmpty(this.props.contributions) && this.refs.chartContainer) {
      var element = this.refs.chartContainer.getDOMNode();
      let model = new ChartModel(contributions)
      new ChartView(element).render(model);
    }
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