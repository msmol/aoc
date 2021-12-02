const fs = require('fs');

const data = fs.readFileSync('input/day02.input', 'utf8')
  .split('\n')
  .filter(x => x !== '');

// Part 1 //

const positionalData = data.reduce((acc, curr) => {
  const [, changeType, changeAmount ] = /(\w+) (\d+)/.exec(curr);
  if (changeType === 'forward') {
    acc.position += Number(changeAmount);
  } else if (changeType === 'down') {
    acc.depth += Number(changeAmount);
  } else if (changeType === 'up') {
    acc.depth -= Number(changeAmount);
  }
  return acc;
}, {
  position: 0,
  depth: 0,
});

const position = positionalData.position * positionalData.depth;
console.log(position);

// Part 2 //

const positionalData2 = data.reduce((acc, curr) => {
  const [, changeType, changeAmount ] = /(\w+) (\d+)/.exec(curr);
  if (changeType === 'forward') {
    acc.position += Number(changeAmount);
    acc.depth += (changeAmount * acc.aim);
  } else if (changeType === 'down') {
    acc.aim += Number(changeAmount);
  } else if (changeType === 'up') {
    acc.aim -= Number(changeAmount);
  }
  return acc;
}, {
  position: 0,
  depth: 0,
  aim: 0,
});

const position2 = positionalData2.position * positionalData2.depth;
console.log(position2);

