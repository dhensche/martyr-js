#!/usr/bin/env node

var bigint = require('bigint');

/**
  Uses the Taylor series expansion for arctan
  http://en.wikipedia.org/wiki/Inverse_trigonometric_functions#Infinite_series

  @returns bigint
*/
function arccot(x, precision) {
  var unity = bigint(10).pow(precision + 9),
      sum = unity.div(x),
      xpower = sum, n = 3, sign = -1, term;
      
  for(;;) {
    xpower = xpower.div(Math.pow(x, 2));
    term = xpower.div(n);
    
    if (term.eq(0)) break;
    
    sum = sum.add(term.mul(sign));
    sign = -sign;
    n += 2;
  }
  
  return sum;
}

function pi_digits(n) {
  var pi = (arccot(5, n).mul(4).sub(arccot(239, n))).mul(4);
  return pi.div(Math.pow(10, 10));
}

if (require.main === module) {
	var prompt = require('prompt');
	
	prompt.start();
	prompt.message = 'Pi to n digits';

	prompt.get({properties: {n: {type: 'number', default: 100}}}, function(err, input) {
		if (err) throw err;
		var n = input.n;
		console.log('The first %d digits of Pi are \n%s', n, pi_digits(n));
	});
}

exports.arccot = arccot;
exports.digits = pi_digits;