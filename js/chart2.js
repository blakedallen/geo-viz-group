//escavic
//var axis = d3.svg.axis().orient("vertical").ticks(10)
var axis = d3.svg.axis()

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

d3.select('#slider1')
  .call(d3
        .slider()
        .axis(axis)
        // .value( [ 0, 50 ])
        //.orientation("vertical")
        .axis(true)
        .max(maxCarCOO2)
        .min(0)            
        .on("slide", function(evt, value) {
            d3.select('#slider1textmin')
              .text(value)
            CarCOO2 = (value) * COO2perCar * 1000000
            //CarCOO2 = CarCOO2.toFixed(0)
            CarCOO2 = Math.ceil(CarCOO2)
            d3.select('#slider1textemission')
              .text(CarCOO2);  
            totalCOO2 = AirCOO2 + CarCOO2 + BurgerCOO2 + TreeCOO2 + SolarCOO2
            d3.select('#COO2text')
              .text(totalCOO2);
          }));

//d3.select('#slider1').append("text").text("🚗").attr('y', -500)
//d3.select('#slider1').attr('height', 600)
//d3.select('#slider1').append("text").text("test")

d3.select('#slider2')
  .call(d3
        .slider()
        .axis(axis)
        //.orientation("vertical")
        .axis(true)
        .max(maxAirCOO2)
        .min(0)
        .on("slide", function(evt, value) {
            d3.select('#slider2textmin')
              .text(value);
            AirCOO2 = (value) * COO2perAirMi * 1000000
            AirCOO2 = Math.ceil(AirCOO2)
            d3.select('#slider2textemission')
              .text(AirCOO2);    
            totalCOO2 = AirCOO2 + CarCOO2 + BurgerCOO2 + TreeCOO2 + SolarCOO2
            d3.select('#COO2text')
              .text(totalCOO2);
          }));

d3.select('#slider3')
  .call(d3
        .slider()
        .axis(axis)
        //.orientation("vertical")
        .axis(true)
        .max(maxBurgerCOO2)
        .min(0)
        .on("slide", function(evt, value) {
            d3.select('#slider3textmin')
              .text(value)
            BurgerCOO2 = (value) * COO2perBurger * 1000000
            BurgerCOO2 = Math.ceil(BurgerCOO2)
            d3.select('#slider3textemission')
              .text(BurgerCOO2);      
            totalCOO2 = AirCOO2 + CarCOO2 + BurgerCOO2 + TreeCOO2 + SolarCOO2
            d3.select('#COO2text')
              .text(totalCOO2);
          }));

d3.select('#slider4')
  .call(d3
        .slider()
        .axis(axis)
        //.orientation("vertical")
        .axis(true)
        .max(maxTreeCOO2)
        .min(0)
        .on("slide", function(evt, value) {
            d3.select('#slider4textmin')
              .text(value)
            TreeCOO2 = (value) * COO2perTree * 1000
            TreeCOO2 = Math.ceil(TreeCOO2)
            d3.select('#slider4textemission')
              .text(TreeCOO2);     
            totalCOO2 = AirCOO2 + CarCOO2 + BurgerCOO2 + TreeCOO2 + SolarCOO2
            d3.select('#COO2text')
              .text(totalCOO2);
          }));

d3.select('#slider5')
  .call(d3
        .slider()
        .axis(axis)
        //.orientation("vertical")
        .axis(true)
        .max(maxSolarCOO2)
        .min(0)
        .on("slide", function(evt, value) {
            d3.select('#slider5textmin')
              .text(value)
            SolarCOO2 = (value) * COO2perSolar * 1000
            SolarCOO2 = Math.ceil(SolarCOO2)
            d3.select('#slider5textemission')
              .text(SolarCOO2);      
            totalCOO2 = AirCOO2 + CarCOO2 + BurgerCOO2 + TreeCOO2 + SolarCOO2
            d3.select('#COO2text')
              .text(totalCOO2);
          }));
