var React = require('react');
var $ = require('jquery');

var Contributions = React.createClass({
  getInitialState: function () {
    return {};
  },

  componentDidMount: function () {
    $.get('/api/v1/contributions', function (results) {
      if (this.isMounted()) {
        this.setState(results);
      }
    }.bind(this));
  },

  render: function () {
    return (
      <table>
        {
          Object.keys(this.state).map(function (repo) {
            return <tbody>
              <tr>
                <th>{repo}</th>
              </tr>
              <tr>
                {
                  Object.keys(this.state[repo]).map(function (user) {
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
});

module.exports = Contributions;



