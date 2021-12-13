const fs = require('fs');

const data = fs.readFileSync('input/day12.input', 'utf8')
  .split('\n')
  .filter(x => x !== '')
  .map(d => d.split('-'));

const caves = [...new Set(data.flat())]

class Node {
  constructor(name) {
    this.name = name;
  }
}

const nodes = caves.map(c => new Node(c))

const connections = caves.reduce((acc, curr) => {
  acc[curr] = [...new Set(data.filter(c => c.includes(curr)).flat().filter(x => x !== curr))];
  return acc;
}, {});

const graph = nodes.map(n => {
  n.children = connections[n.name].map(name => nodes.filter(node => node.name === name)).flat();
  return n;
});

const startNode = graph.find(n => n.name === 'start');

function isSmall(cave) {
  return cave.name ? cave.name === cave.name.toLowerCase() : cave === cave.toLowerCase();
}

function clone(a) {
  return a.map(x => x);
}

const validPaths = [];
function traverse(node, path) {
  if (node === undefined){
    node = startNode;
  }
  if (path === undefined){
    path = [];
  }
  path.push(node.name);
  if (node.name === 'end'){
    validPaths.push(clone(path));
    return ;
  }
  node.children.forEach(child => {
    if (!path.includes(child.name) || !isSmall(child)){
      const newPath = clone(path);
      traverse(child, newPath);
    }
  });
}

traverse();
console.log(validPaths.length);

// part 2

const validPaths2 = [];

function canTraverseNode(node, path) {
  if (node.name === 'start') {
    return !path.includes(node.name);
  }
  if (node.name === 'end') {
    return !path.includes(node.name);
  }

  if (!isSmall(node)) {
    return true;
  }

  if (isSmall(node)) {
    const smalls = path.filter(n => !['start', 'end'].includes(n)).filter(n => isSmall(n));
    const counts = smalls.reduce((acc, curr) => {
      acc[curr] = !acc[curr] ? 1 : acc[curr] + 1;
      return acc;
    }, {});

    return !Object.keys(counts).some(c => counts[c] > 1);
  }
}

function traverse2(node, path) {
  if (node === undefined){
    node = startNode;
  }
  if (path === undefined){
    path = [];
  }
  path.push(node.name);
  if (node.name === 'end'){
    validPaths2.push(clone(path));
    return;
  }
  node.children.forEach(child => {
    if (!path.includes(child.name) || canTraverseNode(child, path)) {
      const newPath = clone(path);
      traverse2(child, newPath);
    }
  });
}

traverse2();
console.log(validPaths2.length);
