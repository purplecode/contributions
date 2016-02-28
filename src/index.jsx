import React from 'react';
import ReactDOM from 'react-dom';
import ChartsList from './components/ChartsList.jsx';
import App from './components/App.jsx';
import { browserHistory, Router, Route, Link, IndexRedirect } from 'react-router'

import "style!css!font-awesome/css/font-awesome.css";
import "style!css!./index.css";

require("react-tap-event-plugin")();


ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="/commits" />
            <Route path="/:type" component={ChartsList} />
        </Route>
    </Router>,
    document.getElementById("react-container")
);