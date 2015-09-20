let React = require('react');

class Table extends React.Component {

  render() {
    let contributions = this.props.contributions;
    return (
      <table>
        {
          Object.keys(contributions).map(function (user) {
            return <tbody>
            <tr>
              <th colspan="2">{user}</th>
            </tr>
            <tr>
              {
                Object.keys(contributions[user]).map(function (date) {
                  return <tr>
                    <td>{date}</td>
                    <td>{contributions[user][date]}</td>
                  </tr>;
                })
              }
            </tr>
            </tbody>
          }.bind(this))
        }
      </table>
    );
  }
}

module.exports = Table;