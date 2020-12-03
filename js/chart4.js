
var yTotalCO2 = 0;
//update sea level api request
var update_sealevel4 = function(data, cb4){
    //get years from years slider
    var y = document.getElementById("chart4years");
    data["years"] = parseInt(y.value);
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
var prev_idg4 = "image_0";
var cb4 = function(data){
    console.log("cb4", data);
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



//add another event listener to the years slider, update based on totalC002
document.getElementById("chart4years")
  .addEventListener("input", function(e){
    var yearText = document.getElementById("chart4yearsText");
      yearText.textContent = e.target.value;
    // update sea level when years value is changed
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
  label1.innerText=0;
  label2.innerText=0;
  label4.innerText=0;
  label5.innerText=0;
  label6.innerText=0;
  label7.innerText=0;
  update_sealevel4({"gt":0},cb4)
  }

slider1.onchange = function() {
  cum_change1 = Number(slider1.value - 10.1);
  yTotalCO2 = Math.round(cum_change1 + cum_change2 +cum_change4 + cum_change5 + cum_change6 +cum_change7);
  ttl.innerHTML = yTotalCO2;
  label1.innerText = cum_change1.toFixed(1);
  var d = {"gt":yTotalCO2};
  update_sealevel4(d,cb4);
}

slider2.onchange = function() {
  cum_change2 = Number(slider2.value - 15.6);
  yTotalCO2 = Math.round(cum_change1 + cum_change2 +cum_change4 + cum_change5 + cum_change6 +cum_change7);
  ttl.innerHTML = yTotalCO2;
  label2.innerText = cum_change2.toFixed(1);
  var d = {"gt":yTotalCO2};
  update_sealevel4(d,cb4);
}

slider4.onchange= function() {
  cum_change4 = Number(slider4.value - 5.4);
  yTotalCO2 = Math.round(cum_change1 + cum_change2 +cum_change4 + cum_change5 + cum_change6 +cum_change7);
  ttl.innerHTML = yTotalCO2;
  label4.innerText = cum_change4.toFixed(1);
  var d = {"gt":yTotalCO2};
  update_sealevel4(d,cb4);
}

slider5.onchange = function() {
  cum_change5 = Number(slider5.value - 2.66);
  yTotalCO2 =Math.round(cum_change1 + cum_change2 +cum_change4 + cum_change5 + cum_change6 +cum_change7);
  ttl.innerHTML = yTotalCO2;
  label5.innerText = cum_change5.toFixed(1);
  var d = {"gt":yTotalCO2};
  update_sealevel4(d,cb4);
}

slider6.onchange = function() {
  cum_change6 = Number(slider6.value - 1.7);
  yTotalCO2 = Math.round(cum_change1 + cum_change2 +cum_change4 + cum_change5 + cum_change6 +cum_change7);
  ttl.innerHTML = yTotalCO2;
  label6.innerText = cum_change6.toFixed(1);
  var d = {"gt":yTotalCO2};
  update_sealevel4(d,cb4);

}

slider7.onchange = function() {
  cum_change7 = Number(slider7.value - 1.2);
  yTotalCO2 = Math.round(cum_change1 + cum_change2 +cum_change4 + cum_change5 + cum_change6 +cum_change7);
  ttl.innerHTML = yTotalCO2;
  label7.innerText = cum_change7.toFixed(1);
  var d = {"gt":yTotalCO2};
  update_sealevel4(d,cb4);
}




