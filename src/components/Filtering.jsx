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
import FilteringStore from '../stores/Filtering';
import {Constants as FilteringConstants} from '../stores/Filtering';
import { autobind } from 'core-decorators';


class Filtering extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            contributors: [],
            selected: []
        };

        store.dispatch(Contributors.getContributors()).then((contributors) => {
                this.setState({
                    contributors: contributors
                });
            }
        );

        let reload = () => {
            store.dispatch(FilteringStore.getSelectedContributors()).then((contributors) => {
                    this.setState({
                        selected: contributors
                    });
                }
            );
        };
        store.subscribe(reload);
        reload();
    }

    @autobind
    onRowSelection(selections) {
        let contributors = (selections === 'all') ? FilteringConstants.ALL : (selections === 'none' ? [] : selections.map(selection => {
            return this.state.contributors[selection];
        }));
        store.dispatch(FilteringStore.filterByContributors(contributors));
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
                onRowSelection={this.onRowSelection}
            >
                <TableHeader selectAllSelected={this.state.selected === FilteringConstants.ALL}>
                    <TableRow>
                        <TableHeaderColumn width={20}/>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Email</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody deselectOnClickaway={false}>
                    {
                        this.state.contributors.map((contributor) => {
                            let selected = this.state.selected.indexOf(contributor) > -1 || this.state.selected === FilteringConstants.ALL;
                            return (<TableRow
                                key={contributor}
                                selected={selected}
                            >
                                <TableRowColumn width={20}>
                                    <Avatar size={20} backgroundColor={Colors.getColor(contributor)}/>
                                </TableRowColumn>
                                <TableRowColumn>{extractTitle(contributor)}</TableRowColumn>
                                <TableRowColumn>{contributor}</TableRowColumn>
                            </TableRow>)
                        })
                    }
                </TableBody>
            </Table>
        );
    }

}

export default Filtering;

