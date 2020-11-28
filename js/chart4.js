
//update sea level api request
var update_sealevel = function(data, cb){
    //get years from years slider
    var y = document.getElementById("chart4years");
    data["years"] = parseInt(y.value)-2018;

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
            cb(data);
        });

}


//update sealevel here
var prev_idg4 = "image_0";
var cb4 = function(data){
    //console.log(data);
    var meters = data["sea_level"];
    var s = document.getElementById("sea_level");
    s.value = meters;
        map.setLayoutProperty(prev_idg4, 'visibility', 'none');
    let idg = "image_"+meters.toString();
    map.setLayoutProperty(idg, 'visibility', 'visible');
    prev_idg4 = idg;

    var numMeters = document.getElementById("numMeters");
    numMeters.textContent = meters.toString();
    var numFeet = document.getElementById("numFeet");
    var feet = data["sea_level"] * 3.281;
    numFeet.textContent = feet.toFixed(1);
}

var cum_change = 0;

//add another event listener to the years slider, update based on totalC002
document.getElementById("chart4years")
  .addEventListener("input", function(e){
    var yearText = document.getElementById("chart4yearsText");
      yearText.textContent = e.target.value;
      console.log(yearText)
    //update sea level when years value is changed
    update_sealevel({"gt":cum_change}, cb4);
});


//yangs chart
var t = "CO2 Emission Slider";
var svg_width = 600;
var svg_height = 600;

var slider1 = document.getElementById("slider1");
var slider2 = document.getElementById("slider2");
var slider3 = document.getElementById("slider3");
var slider4 = document.getElementById("slider4");
var slider5 = document.getElementById("slider5");
var slider6 = document.getElementById("slider6");
var slider7 = document.getElementById("slider7");
var base_line_sl = 21.36 
var base_line_ppm = 408.52
var num_yrs = 2100 - 2018
var cum_change1 = 0
var cum_change2 = 0
var cum_change3 = 0
var cum_change4 = 0
var cum_change5 = 0
var cum_change6 = 0
var cum_change7 = 0

//reset all values
function resetFunction() {
  document.getElementById("sliderForm").reset();
  cum_change1 = 0;
  cum_change2 = 0;
  cum_change3 = 0;
  cum_change4 = 0;
  cum_change5 = 0;
  cum_change6 = 0;
  cum_change7 = 0;
  document.getElementById("ttl").innerHTML=0;
}

slider1.onchange = function() {
  cum_change1 = Number(slider1.value - 10.1);
  cum_change = Math.round(cum_change1 + cum_change2 +cum_change3 +cum_change4 + cum_change5 + cum_change6 +cum_change7);
  
  document.getElementById("ttl").innerHTML = cum_change;
}

slider2.onchange = function() {
  cum_change2 = Number(slider2.value - 9.9);
  cum_change = Math.round(cum_change1 + cum_change2 +cum_change3 +cum_change4 + cum_change5 + cum_change6 +cum_change7);
  document.getElementById("ttl").innerHTML = cum_change;
}

slider3.onchange = function() {
  cum_change3 = Number(slider3.value - 5.6);
  cum_change = Math.round(cum_change1 + cum_change2 +cum_change3 +cum_change4 + cum_change5 + cum_change6 +cum_change7);
  document.getElementById("ttl").innerHTML = cum_change;
}

slider4.onchange= function() {
  cum_change4 = Number(slider4.value - 5.4);
  cum_change = Math.round(cum_change1 + cum_change2 +cum_change3 +cum_change4 + cum_change5 + cum_change6 +cum_change7);
  document.getElementById("ttl").innerHTML = cum_change;
}

slider5.onchange = function() {
  cum_change5 = Number(slider5.value - 2.66);
  cum_change =Math.round(cum_change1 + cum_change2 +cum_change3 +cum_change4 + cum_change5 + cum_change6 +cum_change7);
  document.getElementById("ttl").innerHTML = cum_change;
}

slider6.onchange = function() {
  cum_change6 = Number(slider6.value - 1.7);
  cum_change = Math.round(cum_change1 + cum_change2 +cum_change3 +cum_change4 + cum_change5 + cum_change6 +cum_change7);
  document.getElementById("ttl").innerHTML = cum_change;

}

slider7.onchange = function() {
  cum_change7 = Number(slider7.value - 1.2);
  cum_change = Math.round(cum_change1 + cum_change2 +cum_change3 +cum_change4 + cum_change5 + cum_change6 +cum_change7);
  document.getElementById("ttl").innerHTML = cum_change;
}

function gen_slr() {
  if (14.327+5.97*cum_change <0){
    slr.innerHTML =  Math.round(0.001*(1.016**num_yrs))}
  else {slr.innerHTML = Math.round(((-34.518+(14.327+5.97*cum_change+base_line_ppm)*0.135-base_line_sl)/100)*(1.016**num_yrs))
  }
  }


