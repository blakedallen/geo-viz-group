//update sea level api request
var update_sealevel = function(data, cb){
    //get years from years slider
    var y = document.getElementById("years");
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

var data = {
    "years":2000,
    "gt":10000,
}

//update sealevel here
var prev_idg = "image_0";
var cb = function(data){
    //console.log(data);
    var meters = data["sea_level"];
    var s = document.getElementById("sea_level");
    s.value = meters;
        map.setLayoutProperty(prev_idg, 'visibility', 'none');
    let idg = "image_"+meters.toString();
    map.setLayoutProperty(idg, 'visibility', 'visible');
    prev_idg = idg;

    var numMeters = document.getElementById("numMeters");
    numMeters.textContent = meters.toString();
    var numFeet = document.getElementById("numFeet");
    var feet = data["sea_level"] * 3.281;
    numFeet.textContent = feet.toFixed(1);
}


//escavic

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

var slider1 = d3
    .sliderHorizontal()
    .min(0)
    .max(maxCarCOO2)
    .ticks(20)
    .step(1)
    .width(530)
    .fill("red")
    .displayValue(true)
    .on('onchange', (value) => {
            d3.select('#slider1textmin')
              .text(value)
            CarCOO2 = (value) * COO2perCar * 1000000
            CarCOO2 = Math.ceil(CarCOO2)
            d3.select('#slider1textemission')
              .text(CarCOO2);  
            totalCOO2 = AirCOO2 + CarCOO2 + BurgerCOO2 + TreeCOO2 + SolarCOO2
            d3.select('#COO2text')
              .text(totalCOO2);
        var d = {"gt":totalCOO2};
        update_sealevel(d,cb);
    });
 
  d3.select('#slider1')
    .append('svg')
    .attr('width', 800)
    .attr('height', 65)
    .append('g')
    .attr('transform', 'translate(30,30)')
    .call(slider1);

var slider2 = d3
    .sliderHorizontal()
    .min(0)
    .max(maxAirCOO2)
    .ticks(10)
    .step(1)
    .width(530)
    .fill("red")
    .displayValue(true)
    .on('onchange', (value) => {
            d3.select('#slider2textmin')
              .text(value);
            AirCOO2 = (value) * COO2perAirMi * 1000000
            AirCOO2 = Math.ceil(AirCOO2)
            d3.select('#slider2textemission')
              .text(AirCOO2);    
            totalCOO2 = AirCOO2 + CarCOO2 + BurgerCOO2 + TreeCOO2 + SolarCOO2
            d3.select('#COO2text')
              .text(totalCOO2);
        var d = {"gt":totalCOO2};
        update_sealevel(d,cb);
    });
 
  d3.select('#slider2')
    .append('svg')
    .attr('width', 800)
    .attr('height', 65)
    .append('g')
    .attr('transform', 'translate(30,30)')
    .call(slider2);
  
var slider3 = d3
    .sliderHorizontal()
    .min(0)
    .max(maxBurgerCOO2)
    //.ticks(20)
    .step(1)
    .width(530)
    .fill("red")
    .displayValue(true)
    .on('onchange', (value) => {
            d3.select('#slider3textmin')
              .text(value)
            BurgerCOO2 = (value) * COO2perBurger * 1000000
            BurgerCOO2 = Math.ceil(BurgerCOO2)
            d3.select('#slider3textemission')
              .text(BurgerCOO2);      
            totalCOO2 = AirCOO2 + CarCOO2 + BurgerCOO2 + TreeCOO2 + SolarCOO2
            d3.select('#COO2text')
              .text(totalCOO2);
        var d = {"gt":totalCOO2};
        update_sealevel(d,cb);
    });
 
  d3.select('#slider3')
    .append('svg')
    .attr('width', 800)
    .attr('height', 65)
    .append('g')
    .attr('transform', 'translate(30,30)')
    .call(slider3);  

var slider4 = d3
    .sliderHorizontal()
    .min(0)
    .max(maxTreeCOO2)
    //.ticks(20)
    .step(1)
    .width(530)
    .fill("green")
    .displayValue(true)
    .on('onchange', (value) => {
            d3.select('#slider4textmin')
              .text(value)
            TreeCOO2 = (value) * COO2perTree * 1000
            TreeCOO2 = Math.ceil(TreeCOO2)
            d3.select('#slider4textemission')
              .text(TreeCOO2);     
            totalCOO2 = AirCOO2 + CarCOO2 + BurgerCOO2 + TreeCOO2 + SolarCOO2
            d3.select('#COO2text')
              .text(totalCOO2);
        var d = {"gt":totalCOO2};
        update_sealevel(d,cb);
    });
 
  d3.select('#slider4')
    .append('svg')
    .attr('width', 800)
    .attr('height', 65)
    .append('g')
    .attr('transform', 'translate(30,30)')
    .call(slider4);  

var slider5 = d3
    .sliderHorizontal()
    .min(0)
    .max(maxSolarCOO2)
    //.ticks(20)
    .step(1)
    .width(530)
    .fill("green")
    .displayValue(true)
    .on('onchange', (value) => {
            d3.select('#slider5textmin')
              .text(value)
            SolarCOO2 = (value) * COO2perSolar * 1000
            SolarCOO2 = Math.ceil(SolarCOO2)
            d3.select('#slider5textemission')
              .text(SolarCOO2);      
            totalCOO2 = AirCOO2 + CarCOO2 + BurgerCOO2 + TreeCOO2 + SolarCOO2
            d3.select('#COO2text')
              .text(totalCOO2);
        var d = {"gt":totalCOO2};
        update_sealevel(d,cb);
    });
 
  d3.select('#slider5')
    .append('svg')
    .attr('width', 800)
    .attr('height', 65)
    .append('g')
    .attr('transform', 'translate(30,30)')
    .call(slider5);  
