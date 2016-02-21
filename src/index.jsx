import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

import "style!css!font-awesome/css/font-awesome.css";
import "style!css!./index.css";

require("react-tap-event-plugin")();


ReactDOM.render(
    <App />,
    document.getElementById("react-container")
);