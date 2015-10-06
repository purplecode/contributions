let _ = require('lodash');
let React = require('react');
let nanoajax = require('nanoajax');
let Avatar = require('material-ui/lib/avatar');
let Card = require('material-ui/lib/card/card');
let CardMedia = require('material-ui/lib/card/card-media');
let CardHeader = require('material-ui/lib/card/card-header');
let CardTitle = require('material-ui/lib/card/card-title');
let Colors = require('../constants/Colors');

class Legend extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contributors: []
    };
  }

  componentDidMount() {
    nanoajax.ajax('/api/v1/contributors', (code, results) => {
      this.setState({contributors: JSON.parse(results).sort()});
    });
  }

  render() {

    let extractTitle = (contributor) => {
      contributor = contributor.split('@')[0];
      contributor = contributor.replace(/[\._]/g, ' ');
      return contributor.replace(/\w\S*/g, function (text) {
        return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
      });
    };

    return (
      <div>
        {
          this.state.contributors.map(function (contributor) {
            return <div>
              <Card>
                <CardHeader
                  title={extractTitle(contributor)}
                  subtitle={contributor}
                  avatar={<Avatar backgroundColor={Colors.getColor(contributor)}></Avatar>}/>
              </Card>
            </div>
          })
        }
      </div>
    )
  }
}

module.exports = Legend;