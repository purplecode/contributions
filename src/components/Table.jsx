const React = require('react');
const Table = require('material-ui/lib/table/table');
const TableHeader = require('material-ui/lib/table/table-header');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableBody = require('material-ui/lib/table/table-body');
const TableFooter = require('material-ui/lib/table/table-footer');

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
                <TableHeaderColumn tooltip={contributor}>{contributor}</TableHeaderColumn>
                {
                  dates.map(function (date) {
                    return <TableHeaderColumn tooltip={date}>{contributions[contributor][date] || '-'}</TableHeaderColumn>
                  })
                }
              </TableRow>
            })
          }
        </TableBody>
      </Table>

    );

    //return (
    //  <table>
    //    {
    //      Object.keys(contributions).map(function (user) {
    //        return <tbody>
    //        <tr>
    //          <th colspan="2">{user}</th>
    //        </tr>
    //        <tr>
    //          {
    //            Object.keys(contributions[user]).map(function (date) {
    //              return <tr>
    //                <td>{date}</td>
    //                <td>{contributions[user][date]}</td>
    //              </tr>;
    //            })
    //          }
    //        </tr>
    //        </tbody>
    //      }.bind(this))
    //    }
    //  </table>
    //);

    //{
    //  contributors.map(function (user) {
    //    return <TableRow>
    //      <TableHeaderColumn>{user}</TableHeaderColumn>
    //      {
    //        dates.map(function (date) {
    //          return <TableRowColumn>{contributions[user][date] || '-'}</TableRowColumn>;
    //        })
    //      }
    //    </TableRow>
    //  }.bind(this))
    //}
  }
}

module.exports = TableComponent;