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
var val = document.getElementById("CO2");
var slr = document.getElementById("SLR");
var cum_change = 0
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
}


slider2.onchange = function() {
  cum_change += Number(val.innerHTML);
}

slider3.onchange = function() {
  cum_change += Number(val.innerHTML);
}

slider4.onchange = function() {
  cum_change += Number(val.innerHTML);
}

slider5.onchange = function() {
  cum_change += Number(val.innerHTML);
}

slider6.onchange = function() {
  cum_change += Number(val.innerHTML);

}

slider7.onchange = function() {
  cum_change += Number(val.innerHTML);

}

function gen_slr() {
  if (26.65+6.48*window.cum_change <0){
    slr.innerHTML =  Math.round(0.001*1.016**window.num_yrs)}
  else {slr.innerHTML = Math.round((-36.17+(26.65+6.48*window.cum_change+window.base_line_ppm)*0.14-window.base_line_sl)/100*1.016**window.num_yrs)
  }
  }

  