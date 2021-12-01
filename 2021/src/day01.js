const fs = require('fs');

const data = fs.readFileSync('input/day01.input', 'utf8')
  .split('\n')
  .map(i => parseInt(i, 10))
  .filter(x => !isNaN(x));

const increases = data.filter((d, i) => d > data[i-1]).length;

console.log(increases);

const windows = data.reduce((result, value, key) => {
  const window = data.slice(key, key+3);
  if (window.length === 3) result.push(window);
  return result;
}, []);

const sums = windows.map(window => window.reduce((acc, curr) => acc + curr, 0));
const windowIncreases = sums.filter((sum, i) => sum > sums[i-1]).length;

console.log(windowIncreases);
