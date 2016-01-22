import _ from 'lodash';
import d3 from 'd3';
import React from 'react';
import ReactDOM from 'react-dom';
import LinearProgress from 'material-ui/lib/linear-progress';
import ChartModel from './chart/ChartModel';
import ChartView from './chart/ChartView';

class Chart extends React.Component {

  componentDidUpdate() {
      if(!_.isEmpty(this.props.contributions) && this.refs.chartContainer) {
          var element = ReactDOM.findDOMNode(this.refs.chartContainer);
          let model = new ChartModel(this.props.contributions)
          new ChartView(element).render(model);
      }
  }

  render() {
    return (
      <div className="chart" ref="chartContainer"/>
    )
  }
}

module.exports = Chart;