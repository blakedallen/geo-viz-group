
//maximum meters global
const MAX_METERS=79;

//possible future sea levels for different greenhouse gas pathways
//https://www.climate.gov/news-features/understanding-climate/climate-change-global-sea-level#:~:text=Based%20on%20their%20new%20scenarios,above%202000%20levels%20by%202100.
//
//
//update the select button
var allGroup = [
  "NOAA - Low Prediction",
  "NOAA - Extreme Prediction",
  "1/2 Global Sea Ice Melts",
  "All Global Sea Ice Melts",
]

d3.select("#selectButton")
      .selectAll('myOptions')
      .data(allGroup)
      .enter()
      .append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

// set the dimensions and margins of the graph
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#chart1graph")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

var line = svg.append("path");

var chart1Data = {

low : [
    {
        "year":2000,
        "height":0,
    },
    {
        "year":2050,
        "height":0.15,
    },
    {
        "year":2200,
        "height":2,
    },
],
intermediateLow:[
    {
        "year":2000,
        "height":0,
    },
    {
        "year":2050,
        "height":0.25,
    },
    {
        "year":2200,
        "height":1,
    },
],
intermediate:[
    {
        "year":2000,
        "height":0,
    },
    {
        "year":2050,
        "height":0.5,
    },
    {
        "year":2200,
        "height":2.0,
    },
],
intermediateHigh:[
    {
        "year":2000,
        "height":0,
    },
    {
        "year":2050,
        "height":0.75,
    },
    {
        "year":2200,
        "height":3,
    },
],
high:[
    {
        "year":2000,
        "height":0,
    },
    {
        "year":2050,
        "height":1.0,
    },
    {
        "year":2200,
        "height":4.0,
    },
],
extreme:[
    {
        "year":2000,
        "height":0,
    },
    {
        "year":2050,
        "height":1.25,
    },
    {
        "year":2200,
        "height":5,
    },
],
ultraExtreme:[
    {
        "year":2000,
        "height":0,
    },
    {
        "year":2050,
        "height":3.0,
    },
    {
        "year":2200,
        "height":35,
    }
],  
exponential:[
    {
        "year":2000,
        "height":0,
    },
    {
        "year":2050,
        "height":8,
    },
    {
        "year":2200,
        "height":70,
    }
]
}
var colors = [
"#fef0d9",
"#fdd49e",
"#fdbb84",
"#fc8d59",
"#e34a33",
"#b30000",
"#dd1c77",
"#f03b20"
];

var pt = d3.timeParse("%Y");

// Add X axis
var x = d3.scaleTime()
  .domain([pt(2000),pt(2200)])
  .range([ 0, width ])

svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 70])
  .range([ height, 0 ]);

svg.append("g")
  .call(d3.axisLeft(y));

// text label for the y axis
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "20px")
      .attr("fill","white")
      .text("Sea Level Rise (meters)");  

// text label for the x axis
  svg.append("text")
      .attr("transform",
            "translate(" + (width/2) + " ," +
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .attr("fill","white")
      .style("font-size", "20px")
      .text("Year");

// Add the line - default is business as usual
var line = svg.append("path")
  .datum(chart1Data.low)
  .attr("fill", "none")
  .attr("stroke", "#fef0d9")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x(function(d) { return x(pt(d.year)) })
    .y(function(d) { return y(d.height) })
    );


//default prev_idg
var prev_idg = "image_0";
//function to manually update sea level
var setSeaLevel = function(meters){


  
    document.getElementById('sea_level').value = Math.round(meters);
    var numMeters = document.getElementById("numMeters");
    numMeters.textContent = meters.toString();
    var numFeet = document.getElementById("numFeet");
    var feet = meters * 3.281; //approximate conversion from
    numFeet.textContent = feet.toFixed(1);
    if (meters > MAX_METERS){
        meters = MAX_METERS;
    }
    //update our map
    if (meters > 0){
      var meters_rounded = Math.round(meters);
      var idg = "image_"+meters_rounded.toString();
      console.log()
      map.setLayoutProperty(idg, 'visibility', 'visible');
      map.setLayoutProperty(prev_idg, 'visibility', 'none');
      prev_idg = idg;
    }

}



//update our chart when selecting a new simulation
var updateChart = function(option, data){
    var t = d3.transition()
        .duration(1000)
        .ease(d3.easeLinear);
    

    switch(option){
        case "NOAA - Low Prediction":
            line
                .datum(data.low)
                .transition(t)
                .attr("stroke", "#fef0d9")
                .attr("d", d3.line()
                    .x(function(d) { return x(pt(d.year)) })
                    .y(function(d) { return y(d.height) })
                )
            setSeaLevel(data.low[2].height);
            break;
        case "Intermediate-low":
            line
                .datum(data.intermediateLow)
                .transition(t)
                .attr("stroke", "#fdd49e")
                .attr("d", d3.line()
                    .x(function(d) { return x(pt(d.year)) })
                    .y(function(d) { return y(d.height) })
                )
            setSeaLevel(data.intermediateLow[2].height);
            break;
        case "Intermediate":
            line
            .datum(data.intermediate)
            .transition()
            .attr("stroke", "#fdbb84")
            .duration(1000)
            .attr("d", d3.line()
              .x(function(d) { return x(pt(d.year)) })
              .y(function(d) { return y(d.height) })
            )
            setSeaLevel(data.intermediate[2].height);
            break;
        case "Intermediate-high":
            line
            .datum(data.intermediateHigh)
            .transition()
            .attr("stroke", "#fc8d59")
            .duration(1000)
            .attr("d", d3.line()
              .x(function(d) { return x(pt(d.year)) })
              .y(function(d) { return y(d.height) })
            )
            setSeaLevel(data.intermediateHigh[2].height);
            break;
        case "High":
            line
            .datum(data.high)
            .transition()
            .attr("stroke", "#e34a33")
            .duration(1000)
            .attr("d", d3.line()
              .x(function(d) { return x(pt(d.year)) })
              .y(function(d) { return y(d.height) })
            )
            setSeaLevel(data.high[2].height);
            break;
        case "NOAA - Extreme Prediction":
            line
            .datum(data.extreme)
            .transition()
            .attr("stroke", "#fc8d59")
            .duration(1000)
            .attr("d", d3.line()
              .x(function(d) { return x(pt(d.year)) })
              .y(function(d) { return y(d.height) })
            )
            setSeaLevel(data.extreme[2].height);
            break;
        case "1/2 Global Sea Ice Melts":
            line
            .datum(data.ultraExtreme)
            .transition()
            .attr("stroke", "#e34a33")
            .duration(1000)
            .attr("d", d3.line()
              .x(function(d) { return x(pt(d.year)) })
              .y(function(d) { return y(d.height) })
            )
            setSeaLevel(data.ultraExtreme[2].height);
            break;
        case "All Global Sea Ice Melts":
            line
            .datum(data.exponential)
            .transition()
            .attr("stroke", "#b30000")
            .duration(1000)
            .attr("d", d3.line()
              .x(function(d) { return x(pt(d.year)) })
              .y(function(d) { return y(d.height) })
            )

            setSeaLevel(data.exponential[2].height);
            break;
        default:
            console.log("undefined option", option);
    }
}

//update based on the button pressed
// When the button is changed, run the updateChart function
d3.select("#selectButton").on("change", function(d) {
      // recover the option that has been chosen
      const selectedOption = d3.select(this).property("value")
      // run the updateChart function with this selected option
      updateChart(selectedOption, chart1Data)
 });

