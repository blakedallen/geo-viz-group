
var yTotalCO2 = 0;
//update sea level api request
var chart4yr = document.getElementById("chart4years");
var update_sealevel4 = function(data, cb4){
    //get years from years slider
    data["years"] = parseInt(chart4yr.value);
    const url = "/predict";
    const params = {
        "headers":{
            "content-type":"application/json",
        },
        "body":JSON.stringify(data),
        "method":"POST",
    }
    fetch(url, params)
        .then(response => response.json())
        .then(data =>{
            cb4(data);
        });

}
//update sealevel here
var prev_idg4 = "image1a_0";
var prev_meter = 0;
var cb4 = function(data){
    //console.log("cb4", data);
    var meters = data["sea_level"];
    var s = document.getElementById("sea_level");
    s.value = meters;
    
    

    var numMeters = document.getElementById("numMeters");
    numMeters.textContent = meters.toString();
    var numFeet = document.getElementById("numFeet");
    var feet = data["sea_level"] * 3.281;
    numFeet.textContent = feet.toFixed(1);

    //update our map
    for (var i = 0; i < iterations; i += 1){
      for (var j = 0; j < iterations; j += 1){
          let prev_idg = "image"+r[i]+c[j]+"_"+prev_meter.toString();
          map.setLayoutProperty(prev_idg, 'visibility', 'none');
      }
    }
    if (meters > 0){
      meters -= 1; 
      for (var i = 0; i < iterations; i += 1){
          for (var j = 0; j < iterations; j += 1){
              let idg = "image"+r[i]+c[j]+"_"+meters.toString();
              console.log(idg);
              map.setLayoutProperty(idg, 'visibility', 'visible');
          }
      } 
      prev_meter = meters;
    }

}



//add another event listener to the years slider, update based on totalC002
chart4yr.addEventListener("input", function(e){
    var yearText = document.getElementById("chart4yearsText");
      yearText.textContent = e.target.value;
      update_sealevel4({"gt":yTotalCO2}, cb4);
});


//yangs chart
var t = "CO2 Emission Slider";
var svg_width = 600;
var svg_height = 600;

var slider1 = document.getElementById("yslider1");
var slider2 = document.getElementById("yslider2");
var slider4 = document.getElementById("yslider4");
var slider5 = document.getElementById("yslider5");
var slider6 = document.getElementById("yslider6");
var slider7 = document.getElementById("yslider7");
var label1 = document.getElementById("yslider1textemission");
var label2 = document.getElementById("yslider2textemission");
var label4 = document.getElementById("yslider4textemission");
var label5 = document.getElementById("yslider5textemission");
var label6 = document.getElementById("yslider6textemission");
var label7 = document.getElementById("yslider7textemission");
var ttl = document.getElementById("ttl");
var change1 = document.getElementById("yslider1textemission");
var change2 = document.getElementById("yslider2textemission");
var change4 = document.getElementById("yslider4textemission");
var change5 = document.getElementById("yslider5textemission");
var change6 = document.getElementById("yslider6textemission");
var change7 = document.getElementById("yslider7textemission");
var base_line_sl = 21.36 
var base_line_ppm = 408.52
var cum_change1 = 0
var cum_change2 = 0
var cum_change4 = 0
var cum_change5 = 0
var cum_change6 = 0
var cum_change7 = 0


//reset all values
function resetFunction() {
  document.getElementById("sliderForm").reset();
  cum_change1 = 0;
  cum_change2 = 0;
  cum_change4 = 0;
  cum_change5 = 0;
  cum_change6 = 0;
  cum_change7 = 0;
  ttl.innerHTML=0;
  change1.innerHTML=0;
  change2.innerHTML=0;
  change4.innerHTML=0;
  change5.innerHTML=0;
  change6.innerHTML=0;
  change7.innerHTML=0;
  chart4yr.value = 2018;
  update_sealevel4({"gt":0,"years":2018},cb4);
  document.getElementById("chart4yearsText").textContent = 2018;
  document.getElementById("numMeters").textContent = 0;
  document.getElementById("numFeet").textContent = 0;
  document.getElementById("sea_level").value = 0;
  
}

slider1.onchange = function() {
  cum_change1 = Number(slider1.value - 10.1);
  yTotalCO2 = Math.round(cum_change1 + cum_change2 +cum_change4 + cum_change5 + cum_change6 +cum_change7);
  ttl.innerHTML = yTotalCO2;
  change1.innerHTML = cum_change1.toFixed(0);
  var d = {"gt":yTotalCO2};
  update_sealevel4(d,cb4);
}

slider2.onchange = function() {
  cum_change2 = Number(slider2.value - 9.9);
  yTotalCO2 = Math.round(cum_change1 + cum_change2 +cum_change4 + cum_change5 + cum_change6 +cum_change7);
  ttl.innerHTML = yTotalCO2;
  change2.innerHTML = cum_change2.toFixed(0);
  var d = {"gt":yTotalCO2};
  document.getElementById("chart4years").value = 2018;
  document.getElementById("chart4yearsText").innerHTML = 2018;
  update_sealevel4(d,cb4);
}

slider4.onchange= function() {
  cum_change4 = Number(slider4.value - 5.4);
  yTotalCO2 = Math.round(cum_change1 + cum_change2 +cum_change4 + cum_change5 + cum_change6 +cum_change7);
  ttl.innerHTML = yTotalCO2;
  change4.innerHTML = cum_change4.toFixed(0);
  var d = {"gt":yTotalCO2};
  update_sealevel4(d,cb4);
}

slider5.onchange = function() {
  cum_change5 = Number(slider5.value - 2.66);
  yTotalCO2 =Math.round(cum_change1 + cum_change2 +cum_change4 + cum_change5 + cum_change6 +cum_change7);
  ttl.innerHTML = yTotalCO2;
  change5.innerHTML = cum_change5.toFixed(0);
  var d = {"gt":yTotalCO2};
  update_sealevel4(d,cb4);
}

slider6.onchange = function() {
  cum_change6 = Number(slider6.value - 1.7);
  yTotalCO2 = Math.round(cum_change1 + cum_change2 +cum_change4 + cum_change5 + cum_change6 +cum_change7);
  document.getElementById("ttl").innerHTML = yTotalCO2;
  ttl.innerHTML = yTotalCO2;
  label6.innerText = cum_change6.toFixed(1);
  var d = {"gt":yTotalCO2};
  change6.innerHTML = cum_change6.toFixed(0);
  update_sealevel4(d,cb4);

}

slider7.onchange = function() {
  cum_change7 = Number(slider7.value - 1.2);
  yTotalCO2 = Math.round(cum_change1 + cum_change2 +cum_change4 + cum_change5 + cum_change6 +cum_change7);
  ttl.innerHTML = yTotalCO2;
  change7.innerHTML = cum_change7.toFixed(0);
  var d = {"gt":yTotalCO2};
  update_sealevel4(d,cb4);
}




