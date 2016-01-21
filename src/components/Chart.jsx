import _ from 'lodash';
import d3 from 'd3';
import React from 'react';
import LinearProgress from 'material-ui/lib/linear-progress';
import ChartModel from './chart/ChartModel';
import ChartView from './chart/ChartView';

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