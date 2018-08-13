'use strict';

const BOARD_SIDE_SIZE = 4;
const _ = require('lodash');

function generateBoard(boardSideSize) {
    const areaSize = Math.pow(boardSideSize, 2);
    const board = Array.from(Array(areaSize).keys());
    board.shift();
    board.push('*');
    return board;
}

const solution = generateBoard(BOARD_SIDE_SIZE);
const board = _.shuffle(solution);

const helper = {
    board: board,
    solution: solution,
    sideSize: BOARD_SIDE_SIZE,
    numberOfTiles: Math.pow(BOARD_SIDE_SIZE,2),
    firstInitialMessage: 'To move tiles use arrows on keyboard',
    secondInitialMessage:'To exit game press Esc or Ctrl + c',
    renderMatchMessage:'|',
    lastRenderMessage:'----------------',
    mark: '*',
    stateProperties: ['cursor', 'board', 'solution', 'boardSideSize'],
    directionsMap: {
        down: 'moveDown',
        up: 'moveUp',
        right: 'moveRight',
        left: 'moveLeft'
    },
    boardGenerationError: 'Board size is small to play!',
    moveLength: 1,
    winMessage: 'Victory!',
    exitMessage: 'Game Over!',
    exitCode: 0,
    escapeKey: {name: 'escape'},
    exitKeyCombination: {ctrl: true, name: 'c'},
    validKeyPress: {name: 'up'}
};

module.exports = helper;