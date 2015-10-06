let React = require('react');
let nanoajax = require('nanoajax');
let Chart = require('./Chart.jsx');
let Card = require('material-ui/lib/card/card');
let CardMedia = require('material-ui/lib/card/card-media');
let CardTitle = require('material-ui/lib/card/card-title');

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

    let style = {
      minHeight: '100px'
    };

    return (
      <Card>
        <CardTitle title={this.props.definition.name} subtitle={this.props.definition.description}/>
        <CardMedia style={style}>
          <Chart contributions={this.state}/>
        </CardMedia>
      </Card>
    );
  }
});

module.exports = Projects;



