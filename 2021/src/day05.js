const fs = require('fs');

const data = fs.readFileSync('input/day05.input', 'utf8')
  .split('\n')
  .filter(x => x !== '')
  .map(d => /(\d+),(\d+) -> (\d+),(\d+)/
    .exec(d)
    .slice(1, 5)
    .map(Number)
  );

const GRID_SIZE = Math.max(...data.flat()) + 1;

const grid = Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => 0));

function getPointsOnLine(x1, y1, x2, y2, includeDiagonal = false) {
  const m = (y1 - y2) / (x1 - x2); // slope of line represented by y = mx + c

  const isHorizontal = Math.abs(m) === 0;
  const isVertical = Math.abs(m) === Infinity;
  const isDiagonal = Math.abs(m) === 1 && includeDiagonal;

  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);

  const c = y1 - x1 * m; // offset of line represented by y = mx + c

  return isHorizontal ?
      Array.from({ length: maxX-minX+1 }, (_, index) => index + minX).map(x => [x, y1]) :
    isVertical ?
      Array.from({ length: maxY-minY+1 }, (_, index) => index + minY).map(y => [x1, y]) :
    isDiagonal ?
      Array.from({ length: maxX-minX+1 }, (_, index) => index + minX).map(x => [x, (m*x + c)]) :
    false;
}

const gridWithLines = data.reduce((acc, curr) => {
  const points = getPointsOnLine(...curr);

  if (points) {
    points.forEach(p => {
      acc[p[1]][p[0]] += 1;
    });
  }

  return acc;
}, grid);


console.log(gridWithLines.flat().filter(p => p > 1).length);


// part 2 //

const grid2 = Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => 0));

const gridWithLines2 = data.reduce((acc, curr) => {
  const points = getPointsOnLine(...curr, true);

  if (points) {
    points.forEach(p => {
      acc[p[1]][p[0]] += 1;
    });
  }

  return acc;
}, grid2);

console.log(gridWithLines2.flat().filter(p => p > 1).length);

