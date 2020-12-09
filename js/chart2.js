//update sea level api request
var update_sealevel = function(data, cb){
    if(data.years === undefined){
        //get years from years slider
        var y = document.getElementById("chart2years");
        data["years"] = parseInt(y.value);

    }
   
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
var prev_idg2 = "image_0";
var cb = function(data){
    var meters = data["sea_level"];
    var s = document.getElementById("sea_level");
    s.value = meters;
    let idg = "image_"+meters.toString();
    map.setLayoutProperty(idg, 'visibility', 'visible');
    map.setLayoutProperty(prev_idg2, 'visibility', 'none');
    prev_idg2 = idg;
    
    var numMeters = document.getElementById("numMeters");
    numMeters.textContent = meters.toString();
    var numFeet = document.getElementById("numFeet");
    var feet = data["sea_level"] * 3.281;
    numFeet.textContent = feet.toFixed(1);
}



//escavic

var GTperTon = 1000000000
var TonsToPPM = 0.001
var COO2perCar = 4.7
var COO2perAirMi = 0.0265
var COO2perBurger = 0.00479
//1,430 x 102,465 = 146,524,950 miles per day
//146,524,950 miles per day x 365 days = 53,481,606,750 miles per year
var COO2perTree = -.024
var COO2perSolar = -10.6

var totalCOO2 = 0
var CarCOO2 = 0
var AirCOO2 = 0
var BurgerCOO2 = 0
var TreeCOO2 = 0
var SolarCOO2 = 0

var maxCarCOO2 = 2000
var maxAirCOO2 = 100000
var maxBurgerCOO2 = 200000
var maxTreeCOO2 = 50000
var maxSolarCOO2 = 5000

var sliderWidth = 720;
var sliderTransform = "translate(20,20)";

//add another event listener to the years slider, update based on totalC002
document.getElementById("chart2years")
  .addEventListener("input", function(e){
    var yearText = document.getElementById("chart2yearsText");
      yearText.textContent = e.target.value;
      
    //update sea level when years value is changed
    update_sealevel({"gt":totalCOO2,"years":e.target.value}, cb);
});

document.getElementById("chart2years")
  .addEventListener("ondragend", function(e){
    var yearText = document.getElementById("chart2yearsText");
      yearText.textContent = e.target.value;
      
    //update sea level when years value is changed
    update_sealevel({"gt":totalCOO2,"years":e.target.value}, cb);
});


var slider1 = d3
    .sliderHorizontal()
    .min(0)
    .max(maxCarCOO2)
    .ticks(20)
    .step(1)
    .width(sliderWidth)
    .fill("red")
    .displayValue(true)
    .on('onchange', (value) => {
            d3.select('#slider1textmin')
              .text(value)
            CarCOO2 = (value) * COO2perCar * 1000000 / GTperTon
            var dispVar1 = Number.parseFloat(CarCOO2).toPrecision(4)
            d3.select('#slider1textemission')
              .text(dispVar1);  
            totalCOO2 = AirCOO2 + CarCOO2 + BurgerCOO2 + TreeCOO2 + SolarCOO2            
            var dispVar2 = Number.parseFloat(totalCOO2).toPrecision(5)
            d3.select('#COO2text')
              .text(dispVar2);
        var d = {"gt":totalCOO2};
        update_sealevel(d,cb);
    });
 
  d3.select('#slider1')
    .append('svg')
    .attr('width', 800)
    .attr('height', 65)
    .append('g')
    .attr('transform', sliderTransform)
    .call(slider1);

var slider2 = d3
    .sliderHorizontal()
    .min(0)
    .max(maxAirCOO2)
    .ticks(10)
    .step(1)
    .width(sliderWidth)
    .fill("red")
    .displayValue(true)
    .on('onchange', (value) => {
            d3.select('#slider2textmin')
              .text(value);
            AirCOO2 = (value) * COO2perAirMi * 1000000 / GTperTon
            var dispVar1 = Number.parseFloat(AirCOO2).toPrecision(4)
            d3.select('#slider2textemission')
              .text(dispVar1);    
            totalCOO2 = AirCOO2 + CarCOO2 + BurgerCOO2 + TreeCOO2 + SolarCOO2
            var dispVar2 = Number.parseFloat(totalCOO2).toPrecision(5)
            d3.select('#COO2text')
              .text(dispVar2);
        var d = {"gt":totalCOO2};
        update_sealevel(d,cb);
    });
 
  d3.select('#slider2')
    .append('svg')
    .attr('width', 800)
    .attr('height', 65)
    .append('g')
    .attr('transform', sliderTransform)
    .call(slider2);
  
var slider3 = d3
    .sliderHorizontal()
    .min(0)
    .max(maxBurgerCOO2)
    //.ticks(20)
    .step(1)
    .width(sliderWidth)
    .fill("red")
    .displayValue(true)
    .on('onchange', (value) => {
            d3.select('#slider3textmin')
              .text(value)
            BurgerCOO2 = (value) * COO2perBurger * 1000000 / GTperTon
            var dispVar1 = Number.parseFloat(BurgerCOO2).toPrecision(4)
            d3.select('#slider3textemission')
              .text(dispVar1);      
            totalCOO2 = AirCOO2 + CarCOO2 + BurgerCOO2 + TreeCOO2 + SolarCOO2
            var dispVar2 = Number.parseFloat(totalCOO2).toPrecision(5)
            d3.select('#COO2text')
              .text(dispVar2);      
        var d = {"gt":totalCOO2};
        update_sealevel(d,cb);
    });
 
  d3.select('#slider3')
    .append('svg')
    .attr('width', 800)
    .attr('height', 65)
    .append('g')
    .attr('transform', sliderTransform)
    .call(slider3);  

var slider4 = d3
    .sliderHorizontal()
    .min(0)
    .max(maxTreeCOO2)
    //.ticks(20)
    .step(1)
    .width(sliderWidth)
    .fill("green")
    .displayValue(true)
    .on('onchange', (value) => {
            d3.select('#slider4textmin')
              .text(value)
            TreeCOO2 = (value) * COO2perTree * 1000 / GTperTon
            var dispVar1 = Number.parseFloat(TreeCOO2).toPrecision(4)
            d3.select('#slider4textemission')
              .text(dispVar1);     
            totalCOO2 = AirCOO2 + CarCOO2 + BurgerCOO2 + TreeCOO2 + SolarCOO2
            var dispVar2 = Number.parseFloat(totalCOO2).toPrecision(5)
            d3.select('#COO2text')
              .text(dispVar2);
        var d = {"gt":totalCOO2};
        update_sealevel(d,cb);
    });
 
  d3.select('#slider4')
    .append('svg')
    .attr('width', 800)
    .attr('height', 65)
    .append('g')
    .attr('transform', sliderTransform)
    .call(slider4);  

var slider5 = d3
    .sliderHorizontal()
    .min(0)
    .max(maxSolarCOO2)
    //.ticks(20)
    .step(1)
    .width(sliderWidth)
    .fill("green")
    .displayValue(true)
    .on('onchange', (value) => {
            d3.select('#slider5textmin')
              .text(value)
            SolarCOO2 = (value) * COO2perSolar * 1000 / GTperTon
            var dispVar1 = Number.parseFloat(SolarCOO2).toPrecision(4)
            d3.select('#slider5textemission')
              .text(dispVar1);      
            totalCOO2 = AirCOO2 + CarCOO2 + BurgerCOO2 + TreeCOO2 + SolarCOO2
            var dispVar2 = Number.parseFloat(totalCOO2).toPrecision(5)
            d3.select('#COO2text')
              .text(dispVar2);
        var d = {"gt":totalCOO2};
        update_sealevel(d,cb);
    });
 
  d3.select('#slider5')
    .append('svg')
    .attr('width', 800)
    .attr('height', 65)
    .append('g')
    .attr('transform', sliderTransform)
    .call(slider5);  
