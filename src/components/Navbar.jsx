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


class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    render() {

        let leftElement = (
            <IconButton onTouchTap={this.handleToggle}>
                <ToggleLeftNav/>
            </IconButton>
        );

        let rightElement = (
            <IconButton
                linkButton={true}
                href="https://github.com/purplecode/contributions"
            >
                <FontIcon className="fa fa-github"/>
            </IconButton>
        );

        return (
            <div>
                <AppBar
                    title="Contributions"
                    iconElementLeft={leftElement}
                    iconElementRight={rightElement}
                />
                <LeftNav docked={false} open={this.state.open} onRequestChange={open => this.setState({open})}>
                    <MenuItem>Menu Item</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                </LeftNav>
            </div>
        )
    }
}

module.exports = Navbar;

