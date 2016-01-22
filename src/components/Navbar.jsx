import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import FontIcon from 'material-ui/lib/font-icon';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import FontAwesome from 'react-fontawesome';


class Navbar extends React.Component {

  render() {
    return (
      <AppBar
        title="Contributions"
        iconElementRight={
            <FlatButton
              linkButton={true}
              href="https://github.com/purplecode/contributions"
              secondary={true}
              label={
                <FontAwesome
                  name='github'
                  size='2x'
                />}
            />
          }
        />
    )
  }
}

module.exports = Navbar;

