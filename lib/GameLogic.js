'use strict';
const _ = require('lodash');

class GameLogic {
    constructor(boardSideSize) {
        this._board = this.generateBoard(boardSideSize);
        this._solution = Object.assign([], this._board);
        this._boardSideSize = boardSideSize;
    }

    generateBoard(boardSideSize) {
        if (boardSideSize < 2) {
            throw new Error('Board size is small to play!');
        }
        let areaSize = Math.pow(boardSideSize, 2);
        let board = Array.from(Array(areaSize).keys());
        board.shift();
        board.push('*');
        return board;
    };

    get board() {
        return Object.assign([], this._board);
    }

    get boardSideSize() {
        return this._boardSideSize;
    }

    shuffleBoard() {
        this._board = _.shuffle(_.shuffle(this._board));
    }

    get playerWon() {
        const {board, solution} = this.state;
        return _.isEqual(board, solution);
    }

    findCursor() {
        return this._board.findIndex((el) => '*' === el);
    }

    get state() {
        const cursor = this.findCursor();
        const board = this._board;
        const boardSideSize = this._boardSideSize;
        const solution = this._solution;
        return {
            cursor, board, boardSideSize, solution
        };
    }

    move(direction) {
        this[this.directions[direction]]();
    }

    get directions() {
        return {
            down: 'moveDown',
            up: 'moveUp',
            right: 'moveRight',
            left: 'moveLeft'
        }
    }

    moveUp() {
        const {cursor, board, boardSideSize} = this.state;
        if (cursor >= boardSideSize) {
            [board[cursor - boardSideSize], board[cursor]] = [board[cursor], board[cursor - boardSideSize]];
        }
    }

    moveDown() {
        const {cursor, board, boardSideSize} = this.state;
        if (cursor < (Math.pow(boardSideSize, 2) - boardSideSize)) {
            [board[cursor + boardSideSize], board[cursor]] = [board[cursor], board[cursor + boardSideSize]];
        }
    }

    moveLeft() {
        const {cursor, board, boardSideSize} = this.state;
        if ((cursor % boardSideSize) !== 0) {
            [board[cursor - 1], board[cursor]] = [board[cursor], board[cursor - 1]];
        }
    }

    moveRight() {
        const {cursor, board, boardSideSize} = this.state;
        if ((cursor + 1) % boardSideSize !== 0) {
            [board[cursor + 1], board[cursor]] = [board[cursor], board[cursor + 1]];
        }
    }
}

module.exports = GameLogic;