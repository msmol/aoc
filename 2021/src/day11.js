const fs = require('fs');

const data = fs.readFileSync('input/day11.input', 'utf8')
  .split('\n')
  .filter(x => x !== '')
  .map(row => row.split(''));

function getAdjacentsCoordinates(x, y) {
  return [
    data[y-1]?.[x] && [x, y - 1], // up
    data[y+1]?.[x] && [x, y + 1], // down
    data[y]?.[x-1] && [x - 1, y], // left
    data[y]?.[x+1] && [x + 1, y], //  right

    data[y-1]?.[x-1] && [x-1, y-1], // diag left up
    data[y-1]?.[x+1] && [x+1, y-1], // diag right up
    data[y+1]?.[x-1] && [x-1, y+1], // diag left down
    data[y+1]?.[x+1] && [x+1, y+1], // diag right down
  ].filter(x => !!x);
}

function clone(d) {
  return d.map(row => row.map(char => char));
}

const flashed1 = new Set();
function hasFlashed(x, y, s, flashed) {
  return flashed.has(`${x}:${y}:${s}`);
}

function step(d, s, flashed) {
  for (let y = 0; y < d.length; y++) {
    for (let x = 0; x < d[y].length; x++) {
      function doStep(dx, dy) {
        const c = Number(d[dy][dx]);
        if (!hasFlashed(dx, dy, s, flashed)) {
          if (c !== 9) {
            const newLevel = c + 1;
            d[dy][dx] = `${newLevel}`;
          } else {
            d[dy][dx] = '0';
            flashed.add(`${dx}:${dy}:${s}`);
            const adjacents = getAdjacentsCoordinates(dx, dy);
            adjacents.forEach(([ax, ay]) => doStep(ax, ay));
          }
        }
      }

      doStep(x, y);
    }
  }
  return d;
}

const d = clone(data);
Array.from({ length: 100 }, (_, i) => i + 1).reduce((acc, s) => step(d, s, flashed1), d);

console.log(flashed1.size)

// part 2
const flashed2 = new Set();
let d2 = clone(data);

function allFlashed(step) {
  const indexes = [];
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      indexes.push(`${x}:${y}:${step}`)
    }
  }
  return indexes.every(i => flashed2.has(i));
}

Array.from({ length: 999999 }).map((_, i) => i + 1).some(s => {
  d2 = step(d2, s, flashed2)
  if (allFlashed(s)) {
    console.log(s);
    return true;
  }
});

