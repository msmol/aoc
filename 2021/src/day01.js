const fs = require('fs');
const _ = require('lodash');

const data = _.chain(fs.readFileSync('input/day01.input', 'utf8'))
  .split('\n')
  .map(i => parseInt(i, 10))
  .reject(_.isNaN)
  .value();

const increases = _.filter(data, (d, i) => d > data[i-1]).length;

console.log(increases);

const windows = _.reduce(data, (result, value, key) => {
  const window = data.slice(key, key+3);
  if (window.length === 3) result.push(window);
  return result;
}, []);

const sums = windows.map(_.sum);
const windowIncreases = _.filter(sums, (sum, i) => sum > sums[i-1]).length;

console.log(windowIncreases);
