#!/usr/bin/env node

var bigint = require('bigint');


function isPrime(n) {
  if (n.eq(2) || n.eq(3)) return true;
  if (n.lt(2) || n.mod(2).eq(0)) return false;
  if (n.lt(9)) return true;
  if (n.mod(3).eq(0)) return false;

  var r = n.sqrt(),
      f = bigint(5);
      
  for (; f.le(r); f = f.add(6)) {
    if (n.mod(f).eq(0)) return false;
    if (n.mod(f.add(2)).eq(0)) return false;
  }
  
  return true;
};

function nextPrime(start) {
  if (start.constructor != bigint) start = bigint(start);
  for (; !isPrime(start); start = start.add(1));
  return start;
}


if (require.main === module) {
  var prompt = require('prompt'),
      program = require('commander');
      
	program
	  .option('-s, --start [s]', 'the number you want to start at')
	  .parse(process.argv);

  prompt.start();
	prompt.message = 'Prime numbers: ';
	prompt.delimiter = '';
	(function showNext(current) {
	  prompt.get(
	    {
	      properties: {
	        next: {
	          description: 'Show Next?',
	          validator: /y(es)?|n(o)?/,
	          warning: 'Valid options are y(es) or n(o)',
	          default: 'y'
	        }
	      }
	    }, function(err, input) {
	  	  if (err) throw err;
	  	  var show = /y(es)?/.test(input.next);
    
	      if (show) {
	        current = nextPrime(current);
	        console.log('Next Prime is %d', current);
	        showNext(current.add(1));
	      }
	  });
	})(bigint(program.start || 1));
}

exports.nextPrime = nextPrime;