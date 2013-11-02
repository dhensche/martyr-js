#!/usr/bin/env node

function test(text) {
  var l = text.length,
      palindrome = true,
      i, j;
  for (i = 0, j = l - 1; i <= l/2; i++, j--) {
    palindrome = text[i] == text[j];
    if (!palindrome) break;
  }
  
  return palindrome;
}

if (require.main === module) {
  var prompt = require('prompt');
  prompt.start();
  prompt.message = 'Palindrome'
  prompt.get(['text'], function(err, result) {
    var palindrome = test(result.text.toLowerCase());
    
    console.log('%s is%s a palindrome', result.text, palindrome ? '' : ' not');
  });
}

exports.name = 'Palindrome';
exports.test = test;