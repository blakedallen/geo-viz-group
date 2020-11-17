var t = "CO2 Emission Slider";
var svg_width = 600;
var svg_height = 600;
var co2Ctry = ["China", "US", "Europe"]
var gCo2Picker = d3.select("#chart4")
    .append("svg")
    .attr("width", svg_width)
    .attr("height", svg_height)
    .attr("fill", "black")
    .style("background-color","#daeddf")
    .style("border","1px dashed #888888")
    .append('g')
    .attr('transform', 'translate(30,30)');

    var slider = d3
          .sliderHorizontal()
          .min(0)
          .max(30)
          .step(1)
          .width(300)
          .ticks(0)
          .default(15)
          .displayValue(true)
          .fill("blue")
          .handle(
            d3
              .symbol()
              .type(d3.symbolCircle)
              .size(200)()
          )
          .on('onchange', val => {
            console.log(val)})
     
        gCo2Picker
          .append('g')
          .attr('transform', 'translate(20,30)')
          .call(slider);
      
gCo2Picker.append("text")
    .text(t)
    .attr("y")
    .attr("x",20);

    
