let React = require('react');
let nanoajax = require('nanoajax');
let mui = require('material-ui');
let Table = require('./Table.jsx');
let Chart = require('./Chart.jsx');
let Navbar = require('./Navbar.jsx');
let Project = require('./Project.jsx');

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
    return {
      total: {},
      projects: []
    };
  },

  componentDidMount: function () {
    nanoajax.ajax('/api/v1/contributions', (code, results) => {
      if (this.isMounted()) {
        this.setState({total: JSON.parse(results)});
      }
    });
    nanoajax.ajax('/api/v1/projects', (code, results) => {
      if (this.isMounted()) {
        this.setState({projects: JSON.parse(results)});
      }
    });
  },
  render: function () {
    return (
      <div>
        <Navbar/>
        <Project definition={{key: 'total', name: 'Total'}} />
        {
          this.state.projects.map(function (project) {
            return <Project definition={project} />;
          })
        }
      </div>
    );
  }
});

module.exports = Contributions;



