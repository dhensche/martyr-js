#!/usr/bin/env node

function count(text) {
  var c = {a: 0, e: 0, i: 0, o: 0, u: 0};
  text.toLowerCase().split('').forEach(function(ch) {
    if (c[ch] != null) {
      c[ch] += 1; 
    }
  });
  
  return c;
}

if (require.main === module) {
  var prompt = require('prompt');
  prompt.start();
  prompt.message = 'Count Vowels'
  prompt.get(['text'], function(err, result) {
    var text = result.text,
        c = count(text);
  
    console.log('Counts:\n\ta: %d\n\te: %d\n\ti: %d\n\to: %d\n\tu: %d\n\tTotal: %d', 
                c['a'], c['e'], c['i'], c['o'],c['u'],
                c['a'] + c['e'] + c['i'] + c['o'] + c['u']);
  });
}

exports.name = 'Vowels';
exports.count = count;