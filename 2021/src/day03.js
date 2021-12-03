const fs = require('fs');

const data = fs.readFileSync('input/day03.input', 'utf8')
  .split('\n')
  .filter(x => x !== '');

const NUM_BITS = data[0].length; // assume all numbers have the same number of bits as the first item


// Part 1 //

const gamma = parseInt(Array.from({ length: NUM_BITS }, (_, index) => index)
  .reduce((acc, curr, i) => {
    const zeros = data.map((bin) => bin[i]).filter(d => d === '0');
    const ones = data.map((bin) => bin[i]).filter(d => d === '1');

    acc[i] = zeros.length > ones.length ? 0 : 1;

    return acc;
  }, [])
  .join(''), 2);

const epsilon = parseInt(Array.from({ length: NUM_BITS }, (_, index) => index)
  .reduce((acc, curr, i) => {
    const zeros = data.map((bin) => bin[i]).filter(d => d === '0');
    const ones = data.map((bin) => bin[i]).filter(d => d === '1');

    acc[i] = zeros.length < ones.length ? 0 : 1;

    return acc;
  }, [])
  .join(''), 2);

console.log(gamma * epsilon);

// part 2 //

const oxygen = parseInt(Array.from({ length: NUM_BITS }, (_, index) => index)
  .reduce((acc, current, i) => {
    const zeros = acc.map((bin) => bin[i]).filter(d => d === '0');
    const ones = acc.map((bin) => bin[i]).filter(d => d === '1');

    const correctDigit = ones.length >= zeros.length ? '1' : '0';
    if (acc.length > 1) {
      acc = acc.filter(num => num[i] === correctDigit);
    }
    return acc;
  }, data)[0], 2);

const co2 = parseInt(Array.from({ length: NUM_BITS }, (_, index) => index)
  .reduce((acc, current, i) => {
    const zeros = acc.map((bin) => bin[i]).filter(d => d === '0');
    const ones = acc.map((bin) => bin[i]).filter(d => d === '1');

    const correctDigit = zeros.length <= ones.length ? '0' : '1';
    if (acc.length > 1) {
      acc = acc.filter(num => num[i] === correctDigit);
    }
    return acc;
  }, data)[0], 2);

console.log(oxygen * co2);

