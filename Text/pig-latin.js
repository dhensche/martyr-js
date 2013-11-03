#!/usr/bin/env node

function translate(text) {
  return text.split(/[^\w]+/).map(function(word) {
    var parts = word.match(/([^aeiou]*)(.*)/i);
    return [parts[2], '-', parts[1], 'ay'].join('');
  }).join(' ');
}

if (module.main) {
  var prompt = require('prompt');
  prompt.start();
  prompt.message = 'Pig Latin'
  prompt.get(['text'], function(err, result) {
    var text = result.text,
        piglatin = translate(text);
  
    console.log('%s in pig latin is:\n%s', text, piglatin);
  });
}

exports.translate = translate;