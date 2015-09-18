var React         = require('react');
var Contributions = require('./components/Contributions.jsx');
var Test = require('./components/Test.jsx');

React.render(
  <div>
    <Test/>
    <Contributions/>
  </div>,
  document.getElementById("react-container")
);