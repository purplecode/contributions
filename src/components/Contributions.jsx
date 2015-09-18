var Contributions = React.createClass({
  getInitialState: function() {
    return [];
  },

  componentDidMount: function() {
    $.get('/api/v1/contributions', function(results) {
      if (this.isMounted()) {
        this.setState(results);
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        {this.state.username}'s last gist is
        <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
});

module.exports = Contributions;
