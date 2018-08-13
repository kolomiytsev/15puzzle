'use strict';

const BOARD_SIDE_SIZE = 4;

const Scene = require('./lib/Scene');
const Game = require('./lib/Game');
const GameLogic = require('./lib/GameLogic');

const scene = new Scene();
const gameLogic = new GameLogic(BOARD_SIDE_SIZE);
const game = new Game(gameLogic, scene);


scene.initialMessage();
game.start();

gameLogic.shuffleBoard();
scene.render(gameLogic.board, gameLogic.boardSideSize);