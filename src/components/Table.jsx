import React from 'react';
import Table from 'material-ui/lib/table/table';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';

let getAllDates = (contributions) => {
  let distinct = _.values(contributions).reduce((memo, item) => {
    _.keys(item).forEach(memo.add.bind(memo));
    return memo;
  }, new Set());
  return [...distinct].sort();
}

class TableComponent extends React.Component {

  render() {

    this.state = {
      fixedHeader: false,
      fixedFooter: false,
      stripedRows: true,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true
    };

    let contributions = this.props.contributions;
    let contributors = Object.keys(contributions).sort()
    let dates = getAllDates(contributions);
    return (
      <Table
        height={this.state.height}
        fixedHeader={this.state.fixedHeader}
        fixedFooter={this.state.fixedFooter}
        selectable={this.state.selectable}
        multiSelectable={this.state.multiSelectable}
        onRowSelection={this._onRowSelection}>
        <TableHeader enableSelectAll={this.state.enableSelectAll}>
          <TableRow>
            <TableHeaderColumn colSpan="{dates.length+1}" tooltip='Contributions' style={{textAlign: 'center'}}>
              Contributions
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn tooltip='The ID'>ID</TableHeaderColumn>
            {
              dates.map(function (date) {
                return <TableHeaderColumn tooltip={date}>{date}</TableHeaderColumn>
              })
            }
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          preScanRows={false}
          showRowHover={this.state.showRowHover}
          stripedRows={this.state.stripedRows}>
          {
            contributors.map(function (contributor) {
              return <TableRow>
                <TableHeaderColumn key={contributor} tooltip={contributor}>{contributor}</TableHeaderColumn>
                {
                  dates.map(function (date) {
                    return <TableHeaderColumn key={`${contributor}`} tooltip={date}>{contributions[contributor][date] || '-'}</TableHeaderColumn>
                  })
                }
              </TableRow>
            })
          }
        </TableBody>
      </Table>

    );
  }
}

module.exports = TableComponent;