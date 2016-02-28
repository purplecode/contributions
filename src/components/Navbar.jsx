import React from 'react';
import styleable from 'react-styleable';
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
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import { Link } from 'react-router'

import css from './navbar.css';


@styleable(css)
class Navbar extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: '0',
            open: false
        };
    }

    componentWillReceiveProps() {
        this.handleRouteChange();
    }

    componentDidMount() {
        this.handleRouteChange();
    }

    handleRouteChange() {
        this.setState({
            selectedTab: this.context.router.isActive('/commits') ? '0' : '1'
        });
    }

    handleTabChange(value, event, tab) {
        this.context.router.push(tab.props.route);
        this.handleRouteChange();
    }

    handleToggle() {
        this.setState({open: !this.state.open});
    }

    render() {

        let leftElement = (
            <IconButton onTouchTap={this.handleToggle.bind(this)}>
                <ToggleLeftNav/>
            </IconButton>
        );

        let rightElement = (
            <div className={this.props.css.links}>
                <Tabs className={this.props.css.tabs} value={`${this.state.selectedTab}`} onChange={this.handleTabChange.bind(this)}>
                    <Tab label="Commits" value="0" route="/commits"/>
                    <Tab label="Lines of code" value="1" route="/lines"/>
                </Tabs>
                <div>
                    <IconButton linkButton href="https://github.com/purplecode/contributions">
                        <FontIcon className="fa fa-github"/>
                    </IconButton>
                </div>
            </div>
        );

        return (
            <div>
                <AppBar
                    title="Contributions"
                    iconElementLeft={leftElement}
                    iconElementRight={rightElement}
                />
                <LeftNav width={600} docked={false} open={this.state.open}
                         onRequestChange={open => this.setState({open})}>
                    <Filtering/>
                </LeftNav>
            </div>
        )
    }
}

export default Navbar;

