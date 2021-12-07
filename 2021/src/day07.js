const fs = require('fs');

const data = fs.readFileSync('input/day07.input', 'utf8')
  .split(',')
  .filter(x => x !== '')
  .map(Number);

function getAlignmentCost(alignmentNumber) {
  return data
    .map(d => Math.abs(d - alignmentNumber))
    .reduce((acc, curr) => acc + curr, 0);
}

const possibleAlignments = Array.from({ length: Math.max(...data) + 1 }, (_, i) => i);

const costs = possibleAlignments.map(a => getAlignmentCost(a));
console.log(Math.min(...costs));

// part 2 //

function getAlignmentCostPart2(alignmentNumber) {
  return data
    .map(d => Array
      .from({ length: Math.abs(d - alignmentNumber) + 1 }, (_, index) => index)
      .reduce((acc, curr) => acc + curr, 0))
    .reduce((acc, curr) => acc + curr, 0);
}

const costs2 = possibleAlignments.map(a => getAlignmentCostPart2(a));
console.log(Math.min(...costs2));
