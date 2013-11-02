#!/usr/bin/env node

var bigint = require('bigint');

function generatePrimeFactors(n) {
  if (n.constructor != bigint) n = bigint(n);
    var factors = [],
        sqrt = n.sqrt(), i;
    for(i = bigint(2); i.le(sqrt); i = i.add(1)) {
      while(n.mod(i).eq(0)) {
        factors.push(i);
        n = n.div(i);
      }
    }
    
    factors.push(n);
    
    return factors.length ? factors : [n];
}

if (require.main === module) {
  var prompt = require('prompt');
    
  prompt.start();
  prompt.message = 'Prime factors of n';
  prompt.get({
    properties: {
      n: {
        required: true,
        pattern: /^\d+$/,
        message: 'Must be a positive whole number'
      }
    }
  }, function(err, input) {
  	if (err) throw err;
  	var n = input.n;
  	console.log('The prime factors of %d are \n%s', n, generatePrimeFactors(bigint(n)));
  });
}

exports.name = 'PrimeFactors';
exports.generate = generatePrimeFactors;