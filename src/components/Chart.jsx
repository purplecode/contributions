import _ from 'lodash';
import d3 from 'd3';
import styleable from 'react-styleable';
import React from 'react';
import ReactDOM from 'react-dom';
import LinearProgress from 'material-ui/lib/linear-progress';
import ChartModel from './chart/ChartModel';
import ChartView from './chart/ChartView';

import css from './chart.css';

@styleable(css)
class Chart extends React.Component {

  componentDidUpdate() {
      if(!_.isEmpty(this.props.contributions) && this.refs.chartContainer) {
          var element = ReactDOM.findDOMNode(this.refs.chartContainer);
          let model = new ChartModel(this.props.projectKey, this.props.contributions)
          new ChartView(element, this.props.css).render(model);
      }
  }

  render() {
    return (
      <div className={this.props.css.chart} ref="chartContainer"/>
    )
  }
}

export default Chart;