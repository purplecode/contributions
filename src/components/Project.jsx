import React from 'react';
import nanoajax from 'nanoajax';
import Chart from './Chart.jsx';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';

class Project extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

        nanoajax.ajax({url: `/api/v1/contributions/${this.props.definition.key}`}, (code, results) => {
            this.setState(JSON.parse(results));
        });
    }

    render() {

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
}

module.exports = Project;



