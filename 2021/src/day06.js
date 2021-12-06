const fs = require('fs');

let data = fs.readFileSync('input/day06.input', 'utf8')
  .split(',')
  .filter(x => x !== '')
  .map(Number);

const NUM_DAYS = 80;

function ageFish(currentAge) {
  if (currentAge === 0) {
    return [6,8]
  } else {
    return [currentAge-1]
  }
}

const days = Array.from({ length: NUM_DAYS }, (_, index) => index);

days.forEach(_ => {
  data = data.reduce((acc, curr, i) => {
    const fish = ageFish(curr)
    acc[i] = fish[0];
    if (fish[1]) {
      acc.push(fish[1]);
    }
    return acc;
  }, data)
})

console.log(data.length);

// part 2

const BIG_NUM_DAYS = 256;
const bigDays = Array.from({ length: BIG_NUM_DAYS }, (_, index) => index);

const freshData = fs.readFileSync('input/day06.input', 'utf8')
  .split(',')
  .filter(x => x !== '')
  .map(Number);

function step(count) {
  return {
    8: count[0],
    7: count[8],
    6: count[7] + count[0],
    5: count[6],
    4: count[5],
    3: count[4],
    2: count[3],
    1: count[2],
    0: count[1],
  };
}

const initialCounts = freshData.reduce((acc, curr) => {
  acc[curr] += 1;
  return acc;
}, Array.from({ length: 9 }, (_, index) => index).reduce((base, i) => {
  base[i] = 0;
  return base;
}, {}));

const finalCounts = bigDays.reduce(step, initialCounts);

console.log(Object.keys(finalCounts).reduce((acc, curr) => acc + finalCounts[curr], 0));
