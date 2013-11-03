#!/usr/bin/env node

// denominations in pennies
var denominations = [
  { label: 'hundred dollar bill', value: 100 * 100 },
  { label: 'fifty dollar bill',   value: 50 * 100 },
  { label: 'twenty dollar bill',  value: 20 * 100 }, 
  { label: 'ten dollar bill',     value: 10 * 100 },
  { label: 'five dollar bill',    value: 5 * 100 },
  { label: 'one dollar bill',     value: 100 },
  { label: 'quarter',             value: 25 },
  { label: 'dime',                value: 10 },
  { label: 'nickel',              value: 5 },
  { label: 'penny',               value: 1 }
  ];


function change(cash, price) {
  if (price > cash) throw new Error('Not enough cash is available to cover the price');
  
  var leftovers = (cash * 100) - (price * 100);
  return denominations.map(function mapChange(denomination) {
    var count = Math.floor(leftovers / denomination.value);
    leftovers = leftovers % denomination.value;
    return { label: denomination.label, count: count};
  }).filter(function filterChange(denomination) {
     return denomination.count > 0;
  });
 };

exports.calculate = change;

if (require.main === module) {
  var prompt = require('prompt');

  prompt.start();
  prompt.message = 'Change calculate (denominations from $100 to $0.01)';
  prompt.get({
    properties: {
      cash: {
        type: 'number',
        validator: /[^-A-Za-z]+/,
        warning: 'Only positive numbers are accepted'
      },
      price: {
        type: 'number',
        validator: /[^-A-Za-z]+/,
        warning: 'Only positive numbers are accepted'
      }
    }
  }, function(err, input) {
    if (err) throw err;
    var changeMap = change(input.cash, input.price);
    var descr = changeMap.map(function mapChange(d) {
      var label = d.count == 1 ? d.label : (d.label === 'penny' ? 'pennies' : d.label + 's');
      return d.count + ' ' + label;
    }).join(', ');
    console.log('Change when paying %d for %d is \n%s',
                input.cash, input.price, descr);
  });
}