let React = require('react');
let $ = require('jquery');
let mui = require('material-ui');
let Table = require('./Table.jsx');

const ThemeManager = new mui.Styles.ThemeManager();


var Contributions = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

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
      <Table contributions={this.state}/>
    );
  }
});

module.exports = Contributions;



