class Puzzle {
    constructor(num_puzzle) {
        /*
        num_puzzle = the dimensions of the puzzle
        */
        this.rows = this.cols = sqrt(num_puzzle + 1)

        this.goalState = [];
        this.initialState = [];
        this.currentState = [];

        this.generateRandomState();
    }

    getCurrentState() {
        return this.currentState;
    }

    getInitialState() {
        return this.initialState;
    }

    getZeroPiece(state) {
        return this.getNumPiece(state, 0);
    }

    getNumPiece(state, number) {
        return state.find(function (piece) {
            return (piece.num == number);
        });
    }

    areStatesEquals(a, b) {
        for (let i = 0; i < a.length; i++) {
            if (a[i].num != b[i].num ||
                !a[i].pos.equals(b[i].pos)) {
                return false;
            }
        }
        return true;
    }

    isGoalState(stateToCheck) {
        // for (let i = 0; i < stateToCheck.length; i++) {
        //     if (stateToCheck[i].num != this.goalState[i].num ||
        //         !stateToCheck[i].pos.equals(this.goalState[i].pos)) {
        //         return false;
        //     }
        // }
        // return true;
        return this.areStatesEquals(stateToCheck, this.goalState);
    }

    getSuccessors(state) {
        let successors = [];
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (x == 0 ? !y == 0 : y == 0) {
                    let copyState = this.makeCopyOfState(state);
                    let zeroPiece = this.getZeroPiece(copyState);
                    let neighborPos = p5.Vector.add(zeroPiece.pos, createVector(x, y));
                    if (neighborPos.x >= 0 && neighborPos.x < this.cols && neighborPos.y >= 0 && neighborPos.y < this.rows) {
                        let neighbor = copyState.find(function (piece) {
                            return (neighborPos.equals(piece.pos));
                        });
                        this.movePiece(zeroPiece, neighbor);
                        successors.push([copyState, neighbor.num]);
                    }
                }
            }
        }
        return successors;
    }

    makeCopyOfState(stateToCopy) {
        let copyState = [];
        for (let state of stateToCopy) {
            copyState.push(new Piece(state.pos.x, state.pos.y, state.num));
        }
        return copyState;
    }

    movePiece(a, b) {
        let tempPos = a.pos.copy();
        a.pos = b.pos.copy();
        b.pos = tempPos;
    }

    slidePieceTo(state, slideToNum) {
        let pieceToSlideTo = this.getNumPiece(state, slideToNum);
        let slideFrom = this.getZeroPiece(state);

        let slideFromPos = slideFrom.pos;

        slideFrom.setDestination(pieceToSlideTo.pos);
        pieceToSlideTo.setDestination(slideFromPos);
    }

    anyPieceSliding(state) {
        for (let piece of state) {
            if (piece.vel != null) {
                return true;
            }
        }
        return false;
    }

    generateRandomState() {
        /*
        Generates and returns a random game state
        */
        let state = [];
        for (let num = 0; num < this.rows * this.cols; num++) {
            let x = num % this.cols;
            let y = floor(num / this.rows);
            state.push(new Piece(x, y, num));
            this.goalState.push(new Piece(x, y, num));
        }
        this.currentState = this.shuffle(state);
        this.initialState = this.makeCopyOfState(this.currentState);
    }

    shuffle(arr) {
        /*
        Shuffles and returns the passed in array using the Fisher-Yates Shuffle
        */
        for (let i = floor((arr.length - 1) / 2); i > 0; i--) {
            let indexToSwap = floor(random() * (i + 1));
            let tempPos = arr[i].pos.copy();
            arr[i].pos = arr[indexToSwap].pos.copy();
            arr[indexToSwap].pos = tempPos;
        }
        return arr;
    }
}
