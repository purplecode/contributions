////// MAGIC START //////

var jsdom = require('jsdom');

var document = jsdom.jsdom('<div class="container"></div>');
var window = document.defaultView;

self.document = document;
self.window = window;

// order matters
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

    var svg = d3.select('.container').append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(options.xDomain);

    y.domain(options.yDomain);








    return document.querySelector('.container').innerHTML;
}

onmessage = function (event) {
    postMessage(render(event.data));
};