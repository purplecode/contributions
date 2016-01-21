import React from 'react';
import nanoajax from 'nanoajax';
import Chart from './Chart.jsx';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';

var Projects = React.createClass({

    getInitialState: function () {
        return {};
    },

    componentDidMount: function () {
        nanoajax.ajax({url: `/api/v1/contributions/${this.props.definition.key}`}, (code, results) => {
            this.setState(JSON.parse(results));
        });
    },

    render: function () {

        let style = {
            minHeight: '100px'
        };

        return (
            <Card>
                <CardTitle title={this.props.definition.name} subtitle={this.props.definition.description}/>
                <CardMedia style={style}>
                    <Chart contributions={this.state}/>
                </CardMedia>
            </Card>
        );
    }
});

module.exports = Projects;



