import React, { PropTypes } from 'react';
import Navbar from './Navbar.jsx';


class App extends React.Component {

    static propTypes = {
        children: PropTypes.object
    };


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

