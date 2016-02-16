import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

import "font-awesome/css/font-awesome.css";

require("react-tap-event-plugin")();


ReactDOM.render(
    <App/>,
    document.getElementById("react-container")
);