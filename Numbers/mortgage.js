#!/usr/bin/env node

function Mortgage(principal, rate, length, periods) {
  var q = periods || 12;
  return {
    p: principal,
    q: q,
    i: rate,
    l: length,
    j: rate / q,
    n: length * q,
    monthlyPayment: function monthlyPayment() {
      return this.p * (this.j / (1 - Math.pow(1 + this.j, -this.n)));
    },
    periodsLeft: function periodsLeft(payment) {
      var numer = - Math.log(1 - (this.p / payment) * this.j);
      var denom = Math.log(1 + this.j);
      return Math.ceil(numer / denom);
    }
  }
}

module.exports = Mortgage;
if (require.main === module) {
	var prompt = require('prompt');
	
	prompt.start();
	prompt.message = 'Monthly payment for fixed term mortgage';
	prompt.get({
    properties: {
      principal: {
        type: 'number',
        required: true
      },
      rate: {
        pattern: /0\.\d+/,
        required: true,
        description: 'Yearly interest rate in decimal form'
      },
      length: {
        required: true,
        description: 'Number of years for mortgage'
      }
    }
  }, function(err, input) {
		if (err) throw err;
		var mortgage = new Mortgage(input.principal, input.rate, input.length, 12);
		console.log('The monthly payment for a %d year fixed term mortgage of $%d: %d',
      input.length, input.principal, mortgage.monthlyPayment());
	});
}
