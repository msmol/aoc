const fs = require('fs');

let data = fs.readFileSync('input/day08.input', 'utf8')
  .split('\n')
  .filter(x => x !== '')
  .map(line => line.split(' | ').map(x => x.split(' ')));

function count(d) {
  return d.reduce((acc, curr) => {
    const lengths = curr[1].map(x => x.length);
    const uniques = lengths.filter(l => [2,3,4,7].includes(l));

    acc += uniques.length;
    return acc;
  }, 0);
}

console.log(count(data));

// part 2 //

// difference and intersection verbatim from:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#implementing_basic_set_operations

function difference(setA, setB) {
  let _difference = new Set(setA)
  for (let elem of setB) {
    _difference.delete(elem)
  }
  return _difference
}

function intersection(setA, setB) {
  let _intersection = new Set()
  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem)
    }
  }
  return _intersection
}

// sset (string set) get a string as a set of characters
function sset(str) {
  return new Set(str.split(''));
}

function getMappings(input, output) {
  const sortedInput = input
    .map(x => x.split('').sort().join(''))
    .sort((a, b) => a.length > b.length ? 1 : -1);

  const sortedOutput = output.map(x => x.split('').sort().join(''));

  const startingMap = {
    [sortedInput[0]]: 1,
    [sortedInput[1]]: 7,
    [sortedInput[2]]: 4,
    [sortedInput[9]]: 8,
  };

  const segmentMap = sortedInput.slice(3,9).reduce((acc, curr) => {
    if (curr.length === 5) {
      if (difference(sset(curr), sset(sortedInput[0])).size === 3) acc[curr] = 3;
      else if (difference(sset(curr), sset(sortedInput[2])).size === 2) acc[curr] = 5;
      else acc[curr] = 2;
    } else {
      if (difference(sset(curr), sset(sortedInput[2])).size === 2) acc[curr] = 9;
      else if (intersection(difference(sset(sortedInput[9]), sset(curr)), sset(sortedInput[0])).size > 0) acc[curr] = 6;
      else acc[curr] = 0;
    }

    return acc;
  }, Object.assign({}, startingMap));

  return Number(sortedOutput.map(o => segmentMap[o]).join(''));
}

const total = data.reduce((acc, curr) => acc + getMappings(curr[0], curr[1]), 0);

console.log(total);
