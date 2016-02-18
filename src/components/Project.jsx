import React from 'react';
import styleable from 'react-styleable';
import Chart from './Chart.jsx';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import store from '../stores/store';
import Contributions from '../stores/Contributions';

import css from './project.css';

console.log('css', css);

@styleable(css)
class Project extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

        store.dispatch(Contributions.getContributions(this.props.definition.key)).then((contributions) => {
                this.setState({contributions: contributions});
            }
        );

    }

    render() {
        return (
            <Card>
                <CardTitle title={this.props.definition.name} subtitle={this.props.definition.description}/>
                <CardMedia className={this.props.css.cardMedia}>
                    <Chart projectKey={this.props.definition.key} contributions={this.state.contributions}/>
                </CardMedia>
            </Card>
        );
    }
}

export default Project;



