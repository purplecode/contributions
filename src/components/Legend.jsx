import _ from 'lodash';
import React from 'react';
import nanoajax from 'nanoajax';
import Avatar from 'material-ui/lib/avatar';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import Colors from '../styles/Colors';
import store from '../stores/store';
import Contributors from '../stores/Contributors';


class Legend extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            contributors: []
        };

        store.dispatch(Contributors.getContributors()).then(() => {
                let contributors = store.getState().contributors.model;
                this.setState({contributors: contributors});
            }
        );

    }

    render() {

        let extractTitle = (contributor) => {
            contributor = contributor.split('@')[0];
            contributor = contributor.replace(/[\._]/g, ' ');
            return contributor.replace(/\w\S*/g, function (text) {
                return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
            });
        };

        return (
            <div>
                {
                    this.state.contributors.map(function (contributor) {
                        return <div key={contributor}>
                            <Card>
                                <CardHeader
                                    title={extractTitle(contributor)}
                                    subtitle={contributor}
                                    avatar={<Avatar backgroundColor={Colors.getColor(contributor)}></Avatar>}/>
                            </Card>
                        </div>
                    })
                }
            </div>
        )
    }
}

module.exports = Legend;