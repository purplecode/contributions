import _ from 'lodash';
import React from 'react';
import nanoajax from 'nanoajax';
import Avatar from 'material-ui/lib/avatar';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import Colors from '../styles/Colors';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import store from '../stores/store';
import Contributors from '../stores/Contributors';


class Filtering extends React.Component {

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

    onRowSelection(selections) {
        console.log(selections);
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
            <Table
                multiSelectable={true}
                allRowsSelected={true}
                onRowSelection={this.onRowSelection.bind(this)}
            >
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn width={20}></TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Email</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        this.state.contributors.map(function (contributor) {
                            return <TableRow key={contributor}>
                                <TableRowColumn width={20}>
                                    <Avatar size={20} backgroundColor={Colors.getColor(contributor)}></Avatar>
                                </TableRowColumn>
                                <TableRowColumn>{extractTitle(contributor)}</TableRowColumn>
                                <TableRowColumn>{contributor}</TableRowColumn>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        );
    }

}

export default Filtering;

