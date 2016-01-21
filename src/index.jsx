import React from 'react';
import ReactDOM from 'react-dom';

require("react-tap-event-plugin")();

var Contributions = require('./components/Contributions.jsx');

ReactDOM.render(
  <Contributions/>,
  document.getElementById("react-container")
);