const React = require('react');
const RaisedButton = require('material-ui/lib/raised-button');
let mui = require('material-ui');
let ThemeManager = new mui.Styles.ThemeManager();


const Test = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render() {
    return (
      <RaisedButton label="Default" />
    );
  }

});


module.exports = Test;