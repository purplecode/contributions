////// MAGIC START //////
var jsdom = require('jsdom');

var document = jsdom.jsdom('<div class="container"></div>');
var window = document.defaultView;

self.document = document;
self.window = window;

// requires window & document
var d3 = require('d3');
////// MAGIC END //////

function render(options) {

    var margin = {top: 20, right: 70, bottom: 60, left: 100},
        width = options.width - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    x.domain(options.xDomain);

    y.domain(options.yDomain);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var area = d3.svg.area()
        .interpolate('monotone')
        .x(function (d) {
            return x(d.date);
        })
        .y0(function (d) {
            return y(d.y0);
        })
        .y1(function (d) {
            return y(d.y);
        });

    var container = d3.select('.container');

    container.select("svg").remove();

    var svg = container.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var series = svg.selectAll(".series")
        .data(options.series)
        .enter().append("g")
        .attr("class", "series");

    series.append("path")
        .attr("class", "area hint--bottom")
        .attr("data-value", function (d) {
            return d.name;
        })
        .attr("d", function (d) {
            return area(d.values);
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

    return document.querySelector('.container').innerHTML;
}

onmessage = function (event) {
    postMessage({
        id: event.data.id,
        html: render(event.data)
    });
};