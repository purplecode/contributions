let React = require('react');
let nanoajax = require('nanoajax');
let mui = require('material-ui');
let Table = require('./Table.jsx');
let Chart = require('./Chart.jsx');
let Navbar = require('./Navbar.jsx');

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
    nanoajax.ajax('/api/v1/contributions', (code, results) => {
      if (this.isMounted()) {
        this.setState(JSON.parse(results));
      }
    });
  },
// <Table contributions={this.state}/>
  render: function () {
    return (
      <div>
        <Navbar/>
        <Chart contributions={this.state}/>
      </div>
    );
  }
});

module.exports = Contributions;



