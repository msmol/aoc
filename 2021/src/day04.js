const fs = require('fs');

const data = fs.readFileSync('input/day04.input', 'utf8')
  .split('\n')
  .filter(x => x !== '');

function chunk(arr, chunkSize) {
  return arr.reduce((acc, curr, index) => {
    const chunk = Math.floor(index/chunkSize);
    acc[chunk] = [].concat((acc[chunk] || []), curr);
    return acc;
  }, []);
}

function boardWins(board) {
  const hasWinningRow = board.some(row => row.every(num => num === 'x'));

  const transposed = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
  const hasWinningCol = transposed.some(col => col.every(num => num === 'x'));

  return hasWinningRow || hasWinningCol;
}

function callNum(board, calledNum) {
  return board.map(row => row.map(num => num === calledNum ? 'x' : num));
}

function score(board, lastCalledNum) {
  const sum = board
    .flat()
    .filter(x => x !== 'x')
    .map(Number)
    .reduce((acc, curr) => acc+curr, 0);

  return sum * lastCalledNum;
}

const drawNumbers = data[0].split(',');

const boards = chunk(data.slice(1), 5)
  .map(b => b.map(r => r
    .replace(/^\s/, '')
    .split(/\s+/)
  ));

const wins = boards.reduce((acc, board, boardsIndex) => {
  drawNumbers.some((num, drawIndex) => {
    board = callNum(board, num);
    if (boardWins(board)) {
      acc.push({
        boardsIndex: boardsIndex,
        moves: drawIndex,
        board: board,
        lastNumber: num,
      });
      return true;
    }
    return false;
  });
  return acc;
}, []);

const quickestWinMoves = Math.min.apply(Math, wins.map(w => w.moves));
const quickestWinIndex = wins.findIndex(w => w.moves === quickestWinMoves);
const quickestWin = wins[quickestWinIndex];

const quickestScore = score(quickestWin.board, quickestWin.lastNumber);
console.log(quickestScore);


// part 2

const slowestWinMoves = Math.max.apply(Math, wins.map(w => w.moves));
const slowestWinIndex = wins.findIndex(w => w.moves === slowestWinMoves);
const slowestWin = wins[slowestWinIndex];

const slowestScore = score(slowestWin.board, slowestWin.lastNumber);
console.log(slowestScore);
