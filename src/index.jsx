var React = require('react');

require("react-tap-event-plugin")();


var Contributions = require('./components/Contributions.jsx');
var Test = require('./components/Test.jsx');

React.render(
  <div>
    <Test/>
    <Contributions/>
  </div>,
  document.getElementById("react-container")
);