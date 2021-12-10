const fs = require('fs');

let data = fs.readFileSync('input/day10.input', 'utf8')
  .split('\n')
  .filter(x => x !== '')
  .map(x => x.split(''));

const scoreMap = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137.
};

function isOpening(char) {
  return ['(', '[', '{', '<'].includes(char);
}

function canClose(opening, closing) {
  return (opening === '(' && closing === ')') ||
    (opening === '[' && closing === ']') ||
    (opening === '{' && closing === '}') ||
    (opening === '<' && closing === '>');
}

const lineErrors = data.reduce((acc, curr) => {
  const stack = [];
  curr.some(char => {
    if (isOpening(char)) stack.push(char);
    else if (!canClose(stack.pop(), char)) {
      acc.push(char);
      return true;
    }
  });
  return acc;
}, []);

const scores = lineErrors
  .map(x => scoreMap[x])
  .reduce((acc, curr) => acc + curr);

console.log(scores);

// part 2 //

const scoreMap2 = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

const incompleteLines = data.filter(line => {
  const stack = [];
  const hasErr = line.some(char => {
    if (isOpening(char)) stack.push(char);
    else if (!canClose(stack.pop(), char)) {
      return true;
    }
  });

  return !hasErr;
});

const requiredChars = incompleteLines.map((line, i) => {
  const stack = [];
  line.forEach(char => isOpening(char) ? stack.push(char) : stack.pop());

  return [...stack].reverse().map(c => {
    if (c === '(') return ')';
    if (c === '[') return ']';
    if (c === '{') return '}';
    if (c === '<') return '>';
  });
});

const scores2 = requiredChars.map(l => l.reduce((acc, c) => (5*acc) + scoreMap2[c], 0));

scores2.sort((a, b) => a > b ? 1 : -1);

console.log(scores2[((scores2.length - 1)/2)]);
