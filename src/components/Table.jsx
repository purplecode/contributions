let React = require('react');

class Table extends React.Component {

  render() {
    return (
      <table>
        {
          Object.keys(this.props.contributions).map(function (repo) {
            return <tbody>
            <tr>
              <th>{repo}</th>
            </tr>
            <tr>
              {
                Object.keys(this.props.contributions[repo]).map(function (user) {
                  return <tr>
                    <td>{user}</td>
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