let React = require('react');

require("react-tap-event-plugin")();
require("font-awesome-webpack");

var Contributions = require('./components/Contributions.jsx');

React.render(
  <Contributions/>,
  document.getElementById("react-container")
);