var puzzle;
var rows, cols, w;
var soln;

function setup() {
  // put setup code here
  createCanvas(400, 400);

  rows = cols = 3;
  w = width / cols;
  puzzle = new Puzzle(rows * cols - 1);
  soln = [];
  soln = bfs(puzzle);
}

function draw() {
  // put drawing code here
  background(255);

  let currentState = puzzle.getCurrentState();

  if (soln.length > 0 && !puzzle.anyPieceSliding(currentState)) {
    puzzle.slidePieceTo(currentState, soln.splice(0, 1));
    // console.log(puzzle.getCurrentState());
  }

  for (let piece of currentState) {
    piece.update();
    piece.show();
  }
}

function keyPressed() {
  if (key == 'b') {
    console.log(bfs(puzzle));

    // let s = new MySet();
    // let a = puzzle.getCurrentState();
    // s.add(a);
    // let copyA = puzzle.makeCopyOfState(a);
    // console.log(s.has(copyA));
  }
}

function bfs(problem) {
  let visitedSet = new MySet();
  let queue = new Queue();

  queue.push([problem.getCurrentState(), []])
  let count = 0;
  while (!queue.isEmpty()) {
    let item = queue.pop()[0];
    let currentState = item[0];
    let actionsSoFar = item[1];

    if (problem.isGoalState(currentState)) {
      return actionsSoFar;
    }

    if (!visitedSet.has(currentState)) {
      visitedSet.add(currentState);

      for (let successor of problem.getSuccessors(currentState)) {
        let successorState = successor[0];
        let successorPiece = successor[1];
        if (!visitedSet.has(successorState)) {
          queue.push([successorState, actionsSoFar.concat(successorPiece)]);
        }
      }
    }
    count++;
  }

  return null;
}

class Queue {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    return this.items.splice(0, 1);
  }

  isEmpty() {
    return (this.items.length == 0);
  }
}

class MySet {
  constructor() {
    this.items = [];
  }

  add(item) {
    if (!this.has(item)) {
      this.items.push(item);
    }
  }

  has(item) {
    for (let currItem of this.items) {
      if (puzzle.areStatesEquals(item, currItem)) {
        return true;
      }
    }
    return false;
  }
}
