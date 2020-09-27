
var t = "Chart 1";
var svg_width = 600;
var svg_height = 600;
var svg = d3.select("#chart1")
    .append("svg")
    .attr("width", svg_width)
    .attr("height", svg_height)
    .attr("fill", "black")
    .style("background-color","#daeddf")
    .style("border","1px dashed #888888")

svg.append("text")
    .text(t)
    .attr("y",20)
    .attr("x",svg_width/2-20);


