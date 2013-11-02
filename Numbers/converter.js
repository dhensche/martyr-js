#!/usr/bin/env node

var bigint = require('bigint'),
	  _digits = '0123456789abcdefghijklmnopqrstuvwxyz'.split(''),
    digits = {};
    
(function init() {
  _digits.forEach(function(digit, value) {
    digits[digit] = value;
  });
})();
    
function toBaseTen(value, inBase) {
  var result = bigint(0), i, pow;
  
  value = value.toString();
  for (i = value.length - 1, pow = 0; i >= 0; i--, pow++) {
    var multiplier = bigint(inBase).pow(pow),
        digitValue = digits[value[i].toLowerCase()];
    if (digitValue >= inBase) throw new Error('Digit ' + value[i] + ' is out of range for numbers of base ' + inBase);
    result = result.add(bigint(digitValue).mul(multiplier))
  }
  
  return result;
}

function convert(value, inBase, outBase) {
  var negative, decimalValue, result = [];
  
  if (inBase < 2 || inBase > 36 || outBase < 2 || outBase > 36) {
    throw new Error('Invalid base value. Bases must be between 2 and 36');
  }
  
  value = value.toString();
  negative = value.charAt(0) == '-';
  
  if (negative) {
    value = value.substring(1);
  }
  
  // if the input is strictly numeric and incoming base is 10 we can skip converting to base 10
  decimalValue = inBase === 10 && /^-?\d+$/.test(value) ? bigint(value) : toBaseTen(value, inBase);
  
  while (decimalValue.ne(0)) {
    var digit = _digits[decimalValue.mod(outBase)];
    result.unshift(digit);
    decimalValue = decimalValue.div(outBase);
  }
  if (negative) result.unshift('-');
  return result.join('');
}

exports.name = 'NumericConverter';
exports.convert = convert;

if (require.main === module) {
	var prompt = require('prompt');
	
	prompt.start();
	prompt.message = 'Convert number from base x to base y (bases must be between 2 - 36)';
	prompt.get({
    properties: {
      value: {
        required: true,
        description: 'Value you want converted'
      },
      inBase: {
        pattern: /^(\d|[12]\d|3[0-6])$/,
        description: 'Base your input is in'
      },
      outBase: {
        pattern: /^(\d|[12]\d|3[0-6])$/,
        description: 'Base you want output'
      }
    }
  }, function(err, input) {
		if (err) throw err;
		var value = input.value, inBase = input.inBase, outBase = input.outBase, result = convert(value, inBase, outBase);
		console.log('%s, interpreted as a base %d number is %s in base %d', value, inBase, result.toString(), outBase);
	});
}
