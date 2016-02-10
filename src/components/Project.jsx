import React from 'react';
import nanoajax from 'nanoajax';
import Chart from './Chart.jsx';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import store from '../stores/store';
import actions from '../stores/actions';

class Project extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

        store.dispatch(actions.getContributions(this.props.definition.key)).then(() => {
                let contributions = store.getState().contributions[this.props.definition.key].model;
                this.setState(contributions);
            }
        );

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



