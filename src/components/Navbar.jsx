let React = require('react');
const AppBar = require('material-ui/lib/app-bar');
const FontIcon = require('material-ui/lib/font-icon');
const FlatButton = require('material-ui/lib/flat-button');
const IconButton = require('material-ui/lib/icon-button');
const FontAwesome = require('react-fontawesome');


class Navbar extends React.Component {

  render() {
    return (
      <AppBar
        title="Contributions"
        //iconElementLeft={<IconButton></IconButton>}
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

//<FlatButton label={<FontAwesome name='rocket' />}/>
//<FlatButton linkButton={true} href="https://github.com/callemall/material-ui" secondary={true} label={<FontAwesome name='rocket' />}>
//
//</FlatButton>



