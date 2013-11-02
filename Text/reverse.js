#!/usr/bin/env node


function reverse(text) {
  var reversed = [];
  text.split('').forEach(function(ch) {
    reversed.unshift(ch);
  });
  
  return reversed.join('');
};

if (require.main === module) {
  var prompt = require('prompt');
  prompt.start();
  prompt.message = 'Reverse'
  prompt.get(['text'], function(err, result) {    
    console.log('%s reversed is:\n%s', result.text, reverse(result.text))
  });
}

exports.name = 'TextReverser';
exports.reverse = reverse;