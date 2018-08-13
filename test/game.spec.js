'use strict';

const shouldjs = require('should');
const should = require('should-sinon');
const sandbox = require('sinon').createSandbox();
const helper = require('./helper');
const Scene = require('../lib/Scene');
const Game = require('../lib/Game');
const GameLogic = require('../lib/GameLogic');

let scene;
let gameLogic;
let game;

describe('Game', () => {
    beforeEach('Initial set up', () => {
        scene = new Scene();
        gameLogic = new GameLogic(helper.sideSize);
        gameLogic.shuffleBoard();
        game = new Game(gameLogic, scene);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should be initialized with correct data', () => {
        game._gameLogic.should.be.an.Object();
        game._gameLogic.should.be.eql(gameLogic);
        game._scene.should.be.an.Object();
        game._scene.should.be.eql(scene);
    });

    it('Should show correct message on win', () => {
        sandbox.stub(console, 'log');
        sandbox.stub(process, 'exit');
        game.won();
        console.log.should.be.calledOnce();
        console.log.should.be.calledWith(helper.winMessage);
        process.exit.should.be.calledOnce();
        process.exit.should.be.calledWith(helper.exitCode);

        sandbox.restore();
    });

    it('Should show correct message on exit', () => {
        sandbox.stub(console, 'log');
        sandbox.stub(process, 'exit');
        game.exit();
        console.log.should.be.calledOnce();
        console.log.should.be.calledWith(helper.exitMessage);
        process.exit.should.be.calledOnce();
        process.exit.should.be.calledWith(helper.exitCode);

        sandbox.restore();
    });

    it('Should handle key press on empty key', () => {
        shouldjs(game.handleKeyPress()).be.an.Undefined();
    });

    it('Should handle escape key press', () => {
        sandbox.stub(game, 'exit');
        game.handleKeyPress('', helper.escapeKey);
        game.exit.should.be.calledOnce();
    });

    it('Should handle exit key press combination', () => {
        sandbox.stub(game, 'exit');
        game.handleKeyPress('', helper.exitKeyCombination);
        game.exit.should.be.calledOnce();
    });

    it('Should call winning move logic on key press', () => {
        sandbox.stub(game._gameLogic, 'move');
        sandbox.stub(game._gameLogic, 'playerWon').value(true);
        sandbox.stub(game, 'won');
        sandbox.stub(game._scene, 'render');

        game.handleKeyPress('', helper.validKeyPress);
        game.won.should.be.calledOnce();
        game._scene.render.should.not.be.called();
    });

    it('Should call regular move logic on key press', () => {
        sandbox.stub(game._gameLogic, 'move');
        sandbox.stub(game._gameLogic, 'playerWon').value(false);
        sandbox.stub(game, 'won');
        sandbox.stub(game._scene, 'render');

        game.handleKeyPress('', helper.validKeyPress);
        game.won.should.not.be.calledOnce();
        game._scene.render.should.be.calledOnce();
    });
});