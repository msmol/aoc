const fs = require('fs');

let data = fs.readFileSync('input/day09.input', 'utf8')
  .split('\n')
  .filter(x => x !== '');

function getAdjacents(x, y) {
  return [
    data[y-1]?.[x], // up
    data[y+1]?.[x], // down
    data[y]?.[x-1], // left
    data[y]?.[x+1], // right
  ].filter(x => !!x).map(Number);
}

function isLowpoint(x, y) {
  const adjacents = getAdjacents(x, y);
  return adjacents.every(a => a > Number(data[y][x]));
}

const lowpoints = data.reduce((acc, row, y) => {
  row.split('').forEach((item, x) => {
    if (isLowpoint(x, y)) acc.push(Number(item));
  });
  return acc;
}, []);

const score = lowpoints.reduce((acc, curr) => acc + curr, 0) + lowpoints.length;

console.log(score);

// part 2 //

function getAdjacentsCoordinates(x, y) {
  return [
    data[y-1]?.[x] && [x, y - 1], // up
    data[y+1]?.[x] && [x, y + 1], // down
    data[y]?.[x-1] && [x - 1, y], // left
    data[y]?.[x+1] && [x + 1, y], //  right
  ].filter(x => !!x);
}

const lowpointsCoordinates = data.reduce((acc, row, y) => {
  row.split('').forEach((item, x) => {
    if (isLowpoint(x, y)) acc.push([x, y]);
  });
  return acc;
}, []);

const basins = lowpointsCoordinates.reduce((acc, [lx, ly], basinIndex) => {
  function push(x, y) {
    acc[basinIndex].push(`${x}:${y}`); // don't use an array / tuple because it's annoying to check if an array includes another array

    const adjacentsCoordinates = getAdjacentsCoordinates(x, y).filter(([ax, ay]) => data[ay][ax] !== '9');
    adjacentsCoordinates.forEach(([ax, ay]) => {
      if (!acc.flat().includes(`${ax}:${ay}`)) push(ax, ay);
    });
  }

  push(lx, ly);

  return acc;
}, lowpoints.map(() => []));

basins.sort((x, y) => x.length > y.length ? 1 : -1);

const threeLargest = basins.slice(-3);
const answer = threeLargest.reduce((acc, curr) => acc * curr.length, 1);
console.log(answer);
