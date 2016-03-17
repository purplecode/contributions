import d3 from 'd3';
import styleable from 'react-styleable';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import ChartModel from './ChartModel';
import ChartView from './ChartView';
import Colors from '../../styles/Colors';

import css from './chart.css';


@styleable(css)
class Chart extends React.Component {

    static propTypes = {
        css: PropTypes.object,
        projectKey: PropTypes.string,
        statistic: PropTypes.string,
        contributions: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.view = new ChartView();
        this.initialRender = true;
        this.state = {
            html: ''
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        let shouldUpdate = this.props.projectKey !== nextProps.projectKey
            || this.props.statistic !== nextProps.statistic
            || !_.isEqual(Object.keys(this.props.contributions), Object.keys(nextProps.contributions))
            || this.state.html !== nextState.html
            || this.initialRender;

        this.initialRender = false;

        return shouldUpdate;
    }

    componentDidUpdate() {
        let element = ReactDOM.findDOMNode(this.chart);
        let statistic = this.props.statistic === 'commits' ? 'commits' : 'lines.delta';
        let model = new ChartModel(this.props.projectKey, this.props.contributions, statistic);

        this.view.render(element, model).then(html => {
            this.setState({html});
        });

        // ensure tooltip exists
        d3.select("body")
            .selectAll(`.${this.props.css.tooltip}`)
            .data([1]).enter()
            .append("div")
            .attr("class", this.props.css.tooltip)
            .style("opacity", 0);

        var tooltip = d3.select(`.${this.props.css.tooltip}`)

        d3.selectAll(".area")
            .style("fill", function () {
                let value = this.getAttribute('data-value');
                return Colors.getColor(value);
            })
            .on("mouseover", function () {
                let value = d3.event.srcElement.getAttribute('data-value');
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(value)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function () {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    }

    render() {
        return (
            <div className={this.props.css.chart} ref={chart => this.chart = chart} dangerouslySetInnerHTML={{__html: this.state.html}}/>
        )
    }
}

export default Chart;