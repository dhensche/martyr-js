#!/usr/bin/env node

var bigint = require('bigint'),
	  cache = [bigint(0), bigint(1)];

function fib(n) {
	if (cache[n] != null) return cache[n];
	else {
		cache[n] = bigint(fib(n - 1)).add(fib(n - 2));
		return cache[n];
	}
}

exports.name = 'Fibonacci';
exports.firstN = function(n) {
	fib(n);
	return cache.slice(0,n);
}

if (require.main === module) {
	var prompt = require('prompt');
	
	prompt.start();
	prompt.message = 'First n numbers of the fibonacci sequence';
	prompt.get({properties: {n: {type: 'number', required: true}}}, function(err, input) {
		if (err) throw err;
		var n = input.n;
		fib(n);
		console.log('The first %d numbers of the fibonacci sequence are \n%s', n, cache.join('\n'));
	});
}
