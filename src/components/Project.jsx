let React = require('react');
let nanoajax = require('nanoajax');
let Chart = require('./Chart.jsx');


var Projects = React.createClass({

  getInitialState: function () {
    return {};
  },

  componentDidMount: function () {
    nanoajax.ajax(`/api/v1/contributions/${this.props.definition.key}`, (code, results) => {
      this.setState(JSON.parse(results));
    });
  },

  render: function () {
    return (
      <div>
        <h1>{this.props.definition.name}</h1>
        <Chart contributions={this.state}/>
      </div>
    );
  }
});

module.exports = Projects;



