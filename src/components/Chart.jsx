import _ from 'lodash';
import d3 from 'd3';
import styleable from 'react-styleable';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import LinearProgress from 'material-ui/lib/linear-progress';
import ChartModel from './chart/ChartModel';
import ChartView from './chart/ChartView';

import css from './chart.css';

@styleable(css)
class Chart extends React.Component {

    static propTypes = {
        css: PropTypes.object,
        projectKey: PropTypes.string,
        statistic: PropTypes.string,
        contributions: PropTypes.object
    };

    componentDidUpdate() {
        if (/*!_.isEmpty(this.props.contributions) && */this.chart) {
            let element = ReactDOM.findDOMNode(this.chart);
            let statistic = this.props.statistic === 'commits' ? 'commits' : 'lines.delta';
            let model = new ChartModel(this.props.projectKey, this.props.contributions, statistic);
            new ChartView(element, this.props.css).render(model);
        }
    }

    render() {
        return (
            <div className={this.props.css.chart} ref={chart => this.chart = chart}/>
        )
    }
}

export default Chart;