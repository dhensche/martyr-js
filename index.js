module.exports = {
  Numbers: {
    Change: require('./Numbers/change'),
    NumericConverter: require('./Numbers/converter'),
    Fibonacci: require('./Numbers/converter'),
    Mortgage: require('./Numbers/mortgage'),
    Primes: require('./Numbers/next-prime'),
    PiDigits: require('./Numbers/pi-digits'),
    PrimeFactors: require('./Numbers/prime-factors'),
    TileCost: require('./Numbers/tile-cost'),
    UnitConverter: require('./Numbers/unit-converter')
  },
  Text: {
    Vowels: require('./Text/count-vowels'),
    Palindrome: require('./Text/palindrome'),
    PigLatin: require('./Text/pig-latin'),
    Reverser: require('./Text/reverse'),
    WordCounter: require('./Text/word-count')
  }
};