let React = require('react');

require("react-tap-event-plugin")();

var Contributions = require('./components/Contributions.jsx');

React.render(
  <Contributions/>,
  document.getElementById("react-container")
);