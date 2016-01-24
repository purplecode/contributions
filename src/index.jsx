import React from 'react';
import ReactDOM from 'react-dom';
import Contributions from './components/Contributions.jsx';
import ThunkMiddleware from 'redux-thunk';
import Logger from 'redux-logger';
import store from './stores/store';

require("react-tap-event-plugin")();


import { fetchProjectsIfNeeded } from './stores/actions';

store.dispatch(fetchProjectsIfNeeded()).then(() =>
    console.log(store.getState())
)

ReactDOM.render(
  <Contributions/>,
  document.getElementById("react-container")
);