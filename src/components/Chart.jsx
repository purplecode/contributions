let React = require('react');
let AreaChart = require('react-d3/areachart').AreaChart;

var scatterData = [
  {
    name: "series1",
    values: [{x: 0, y: 20}, {x: 24, y: 10}]
  },
  {
    name: "series3",
    values: [{x: 0, y: 82}, {x: 24, y: 82}]
  }
];


class Chart extends React.Component {

  render() {
    return (
      <AreaChart
        data={scatterData}
        width={500}
        height={400}
        title="Number of commits daily"
        />
    );
  }
}

module.exports = Chart;