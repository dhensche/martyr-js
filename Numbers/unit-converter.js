#!/usr/bin/env node
var BigNumber = require('bignumber.js');

var Temperature = function Temperature(value, unit) {
  value = BigNumber(value);
  this.value = value;
  this.unit = unit;
  function toBase() {
    console.log(unit)
    if (unit === Temperature.CELSIUS) {
      return value;
    } else {
      switch(unit) {
        case Temperature.KELVIN:
          return value.minus(273.15);
        case Temperature.FAHRENHEIT:
          return value.minus(32).times(BigNumber(5).div(9));
        default:
          throw new Error('Unexpected unit of temperature');
      }
    }
  };
  
  this.to = function to(newUnit) {
    if (newUnit === unit) return new Temperature(value, unit);
    else {
      var baseValue = toBase();
      switch(newUnit) {
        case Temperature.CELSIUS:
          return new Temperature(baseValue, newUnit);
        case Temperature.KELVIN:
          return new Temperature(value.plus(273.15), newUnit);
        case Temperature.FAHRENHEIT:
          return new Temperature(value.times(BigNumber(9).div(5)).plus(32), newUnit);
        default:
          throw new Error('Unexpected unit of temperature');
      }
    }
  }
}

Temperature.CELSIUS = 0;
Temperature.KELVIN = 1;
Temperature.FAHRENHEIT = 2;

module.exports = Temperature;