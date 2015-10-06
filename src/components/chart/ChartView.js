let d3 = require('d3');

export default class ChartView {
  constructor(element) {
    this.element = element;
  }

  render(model) {

    var margin = {top: 20, right: 20, bottom: 60, left: 50},
      width = 1100 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    var x = d3.time.scale()
      .range([0, width]);

    var y = d3.scale.linear()
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    var area = d3.svg.area()
      .interpolate('cardinal')
      .x(function (d) {
        return x(d.date);
      })
      .y0(function (d) {
        return y(0 + d.y0);
      })
      .y1(function (d) {
        return y(0 + d.y);
      });

    d3.select(this.element).select("svg").remove();

    var svg = d3.select(this.element).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(model.getXDomain());

    y.domain(model.getYDomain());

    var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    var series = svg.selectAll(".series")
      .data(model.getSeriesData())
      .enter().append("g")
      .attr("data-legend", function (d) {
        return d.name;
      })
      .attr("data-legend-color", function (d) {
        return model.getColor(d.name);
      })
      .attr("class", "series");

    series.append("path")
      .attr("class", "area")
      .attr("d", function (d) {
        return area(d.values);
      })
      .style("fill", function (d) {
        return model.getColor(d.name);
      }).on("mouseover", function (d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html(d.name)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function (d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis).selectAll("text")
      .attr("y", 10)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(30)")
      .style("text-anchor", "start");

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
  }
}