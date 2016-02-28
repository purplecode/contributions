import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import FontIcon from 'material-ui/lib/font-icon';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import FontAwesome from 'react-fontawesome';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import ToggleLeftNav from 'material-ui/lib/svg-icons/action/view-headline';
import Filtering from './Filtering.jsx';
import Navbar from './Navbar.jsx';
import { Link } from 'react-router'


class App extends React.Component {

    render() {
        return (
            <div>
                <Navbar />
                {this.props.children}
            </div>
        )
    }
}

export default App;

