
//update sea level api request
var update_sealevel = function(data, cb){
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
    //update sea level when years value is changed
    update_sealevel({"gt":cum_change}, cb4);
});


//yangs chart
var t = "CO2 Emission Slider";
var svg_width = 600;
var svg_height = 600;

var slider1 = document.getElementById("yslider1");
var slider2 = document.getElementById("yslider2");
var slider3 = document.getElementById("yslider3");
var slider4 = document.getElementById("yslider4");
var slider5 = document.getElementById("yslider5");
var slider6 = document.getElementById("yslider6");
var slider7 = document.getElementById("yslider7");
var val = document.getElementById("CO2");
var slr = document.getElementById("SLR");
val.innerHTML = 0
slr.innerHTML = 0
var base_line_sl = 21.36 
var base_line_ppm = 408.52
var num_yrs = 2100 - 2018

slider1.oninput = function() {
  val.innerHTML = this.value - 10.1;
}

slider3.oninput = function() {
  val.innerHTML = this.value - 5.6;
}

slider4.oninput = function() {
  val.innerHTML = this.value - 5.4;
 }


slider5.oninput = function() {
  val.innerHTML = this.value - 2.66;
 }


slider6.oninput = function() {
  val.innerHTML =this.value - 1.7;
 
}

slider7.oninput = function() {
  val.innerHTML = this.value - 1.2;
 
}

slider2.oninput = function() {
  val.innerHTML = this.value - 9.9;
 
}
function resetFunction() {
  document.getElementById("sliderForm").reset();
  val.innerHTML = 0;
  cum_change = 0;
  slr.innerHTML = 0;
}

slider1.onchange = function() {
  cum_change += Number(val.innerHTML);
  console.log(cum_change);
    update_sealevel({"gt":cum_change},cb4);
}


slider2.onchange = function() {
  cum_change += Number(val.innerHTML);
    update_sealevel({"gt":cum_change},cb4);
}

slider3.onchange = function() {
  cum_change += Number(val.innerHTML);
    update_sealevel({"gt":cum_change},cb4);
}

slider4.onchange = function() {
  cum_change += Number(val.innerHTML);
    update_sealevel({"gt":cum_change},cb4);
}

slider5.onchange = function() {
  cum_change += Number(val.innerHTML);
    update_sealevel({"gt":cum_change},cb4);
}

slider6.onchange = function() {
  cum_change += Number(val.innerHTML);
    update_sealevel({"gt":cum_change},cb4);

}

slider7.onchange = function() {
  cum_change += Number(val.innerHTML);
    update_sealevel({"gt":cum_change},cb4);

}

function gen_slr() {
  if (14.327+5.97*cum_change <0){
    slr.innerHTML =  Math.round(0.001*(1.016**num_yrs))}
  else {slr.innerHTML = Math.round(((-34.518+(14.327+5.97*cum_change+base_line_ppm)*0.135-base_line_sl)/100)*(1.016**num_yrs))
  }
  }

