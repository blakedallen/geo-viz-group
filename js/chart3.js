
//
d3.json("/data/tsung-chin.json").then(function(data){

  // console.log(data)
  // define range of slider
  var data_len = Object.keys(data).length - 1;
  // setup margin
  var margin = {top:100, right:100, bottom:100, left:200};

  // setup radius for pie chart to use
  var radius
  setR();

  function setR(){
    //radius based on the interior width of the window
    var width = window.innerWidth;
    if (width < 1024) {
      radius = width/ 5;
    } else if (width < 520) {
      radius = width/ 6;
    } else {
      //default
      radius = 150;
    }
  };

  // setup arc for pie chart to use
  var arc = d3.arc()
              .outerRadius(radius)
              .innerRadius(radius/3);

  // define the canvas width and height based on pie chart
  var w = radius*2 + margin.left + margin.right;
  var h = radius*2 + margin.top + margin.bottom;

  // setup color
  var color = d3.scaleOrdinal().range(d3.schemeCategory10)
  // var color = d3.scaleOrdinal([
  //   "#ffe0cc", "#ffc299", "#ffa366", "#ff944d", "#ff8533",
  //   "#ff751a", "#ff6600", "#e65c00", "#cc5200", "#b34700", "#993d00"
  //   ]);

  // define pie chart
  var pie = d3.pie()
              .value(function(d){
                return d.value;
              })
              .sort(null);

  //
  show();

  //
  function show() {
    // append slider
    var slider = d3.select('#slider')

    // setup initial value
    slider.append('input')
          .attr('type', 'range')
          .attr('data-id', 'slider')
          .attr('class', 'range')
          .attr('step',0)
          .attr('min', 0)
          .attr('max', data_len)
          .attr('value', 0);

    slider.append('div')
          .attr('class', 'range_value');

    //
    showSliderValues();
    drawPie();

    // slider event
    d3.selectAll('.range')
      .on('input', function(){
        this.value = parseInt(this.value);
        if (this.value > 100) {
          return 100;
        }

        showSliderValues();
        updatePie();

      });

  };

  // get data
  function extractData(){
    var d_value
    d3.selectAll('#slider .range').each(function(){
      d_value = this.value
    });
    // console.log(data[d_value]['data'])
    return data[d_value]['data'];

  }


  // show slider value
  function showSliderValues() {
    d3.selectAll('#slider .range').each(function() {
      var level = "Total CO2 Level becomes: " + data[this.value]['amount'] + " million tonnes";
      d3.select('.range_value').html(level);

    });
  };

  // draw pie
  function drawPie() {
    var j = extractData();
    var x = (radius * 2 + margin.left + margin.right) / 2;
    var y = (radius * 2 + margin.top + margin.bottom) / 2;

    //
    d3.select("#pie svg").remove();

    // svg element
    var svg = d3.select("#pie")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h)
                  .append("g")
                  .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    // create classes under the transform
    d3.selectAll("#pie")
       .select("g")
       .append("g")
       .attr("class", "slices");
    d3.selectAll("#pie")
       .select("g")
       .append("g")
       .attr("class", "labels");
    d3.selectAll("#pie")
       .select("g")
       .append("g")
       .attr("class", "lines");
    d3.selectAll("#pie")
       .select("g")
       .append("g")
       .attr("class", "legend");

   // // group paths into slices
   var paths = svg.select(".slices")
                   .selectAll("path")
                   .data(pie(j))

   // render the slices
   paths.enter()
          .append("path")
          .attr("class", "slice")
          .attr("fill", function(d, i){
            return color(i);
          })
          .attr("d", arc)
          .each(function(d) {
            this._current = d;
          })
          .append("title")
          .text(function(d, i) {
            return j[i].value + '%';
          });

    // group all path into label
    var labels = svg.select(".labels")
                    .selectAll("label")
                     .data(pie(extractData()));

    // render labels
    labels.enter()
           .append("text")
           .attr("class", "label")
           .text(function(d, i){
             if (j[i].value > 0) {
               return j[i].label;
             } else {
               return null;
             }
           })
           .attr("fill", function(d, i){
             return color(i);
           })

    //
    updatePie();

  }

  // update pie chart
  function updatePie() {
    arcUpdate();
    labelUpdate();
    linesUpdate();

  };

  // update the slices of pie
  function arcUpdate() {
    var j = extractData();

    d3.selectAll("#pie path title")
        .text(function(d, i) {
          return j[i].value + '%';
        });

    d3.selectAll("#pie path")
        .data(pie(j))
        .transition()
        .duration(600)
        .attrTween('d', arcTween);

  };

  // text labels and update
  function labelUpdate() {
    labelr = radius + 20 // radius for label anchor

    d3.selectAll("#pie text")
        .data(pie(extractData()))
        .transition()
        .duration(600)
        .attr("transform", function(d) {
            var c = arc.centroid(d),
            x = c[0],
            y = c[1],
            h = Math.sqrt(x * x + y * y);
            return "translate(" + (x / h * labelr) + ',' + (y / h * labelr) + ")";
        })
        .attr("dy", "0.35em")
        .attr("text-anchor", function(d) {
            return (d.endAngle + d.startAngle) / 2 > Math.PI ?
            "end" : "start";
        })
        .text(function(d, i) {
            if (extractData()[i].value > 0){
               return extractData()[i].label + " (" + extractData()[i].value + "%)";
            }else {
              return null};
        });

  };

  // text polylines
  var arcOuter= d3.arc()
                  .innerRadius(radius + 50)
                  .outerRadius(radius * 0.95);
  //
  function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
  }

 //
 function linesUpdate(){
   var polyline = d3.select(".lines")
                    .selectAll("polyline")
                    .data(pie(extractData()));
   //
   polyline.enter()
            .append("polyline")
   //
   polyline.transition()
            .duration(600)
            .attrTween("points", function(d) {
              this._current = this._current || d;
              var interpolate = d3.interpolate(this._current, d);
              this._current = interpolate(0);
              return function(t) {
                  var d2 = interpolate(t);
                  var pos = 0;
                  return [arc.centroid(d2), arcOuter.centroid(d2)];
                };
          });
   //
   polyline.exit()
           .remove();

  };

  // arcs transition
  function arcTween(d){
    var i = d3.interpolate(this._current, d);
    this._current = i[0];
    return function(t) {
      return arc(i(t));
    };
  };

  // resizing
  function ChartUpdate() {
    var width = window.innerWidth;
    setR();

    // resizing
    if (width < 520) {
      var arc = d3.arc()
                  .outerRadius(radius)
                  .innerRadius(radius/5);
    } else {
      var arc = d3.arc()
                  .outerRadius(radius)
                  .innerRadius(radius/3);
    }

    var w = radius*2 + margin.left + margin.right;
    var h = radius*2 + margin.top + margin.bottom;

    //
    showSliderValues();
    drawPie();
    showSliderValues();
    updatePie();

    //
    var arcOut = d3.arc()
                    .innerRadius(radius + 50)
                    .outerRadius(radius * 0.95);

    linesUpdate();

  };

  window.addEventListener('resize', ChartUpdate());


//

});


//
