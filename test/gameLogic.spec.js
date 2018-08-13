'use strict';

const _ = require('lodash');
const should = require('should-sinon');
const sandbox = require('sinon').createSandbox();
const helper = require('./helper');
const GameLogic = require('../lib/GameLogic');
let gameLogic;

describe('Game logic', () => {
    beforeEach('Initial set up', () => {
        gameLogic = new GameLogic(helper.sideSize);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should be initialized with correct data', () => {
        gameLogic._board.should.be.an.Array();
        gameLogic._board.length.should.be.eql(helper.numberOfTiles);
        gameLogic._solution.should.be.an.Array();
        gameLogic._solution.length.should.be.eql(helper.numberOfTiles);
        gameLogic._boardSideSize.should.be.eql(helper.sideSize);
    });

    it('Should generate game board', () => {
        const board = gameLogic.generateBoard(helper.sideSize);
        board.should.be.an.Array();
        board.length.should.be.eql(helper.numberOfTiles);
    });

    it('Should throw an Error on board generation', () => {
        (function(){ gameLogic.generateBoard(1) }).should.throw(helper.boardGenerationError);
    });

    it('Should get game board', () => {
        gameLogic.board.should.be.an.Array();
        gameLogic.board.length.should.be.eql(helper.numberOfTiles);

    });

    it('Should get board side size', () => {
        gameLogic.boardSideSize.should.be.a.Number();
        gameLogic.boardSideSize.should.be.eql(helper.sideSize);
    });

    it('Should shuffle board', () => {
        const initialBoard = gameLogic.board;
        gameLogic.shuffleBoard();
        gameLogic.board.should.be.an.Array();
        gameLogic.board.length.should.be.eql(helper.numberOfTiles);
        gameLogic.board.should.not.be.eql(initialBoard);
    });

    it('Should show that player won', () => {
        gameLogic.playerWon.should.be.a.Boolean();
        gameLogic.playerWon.should.be.true();
    });

    it('Should show that player did not win', () => {
        gameLogic.shuffleBoard();
        gameLogic.playerWon.should.be.a.Boolean();
        gameLogic.playerWon.should.be.false();
    });

    it('Should find cursor', () => {
        let cursorIndex = gameLogic.findCursor();
        gameLogic.board[cursorIndex].should.be.eql(helper.mark);

        gameLogic.shuffleBoard();

        cursorIndex = gameLogic.findCursor();
        gameLogic.board[cursorIndex].should.be.eql(helper.mark);
    });

    it('Should get correct state', () => {
        gameLogic.state.should.be.an.Object();
        gameLogic.state.should.have.properties(helper.stateProperties);
        gameLogic.state.board.should.be.eql(gameLogic.state.solution);
        gameLogic.state.cursor.should.be.eql(helper.numberOfTiles - 1);
        gameLogic.state.boardSideSize.should.be.eql(helper.sideSize);

        gameLogic.shuffleBoard();

        gameLogic.state.board.should.not.be.eql(gameLogic.state.solution)
    });

    it('Should get directions', () => {
        gameLogic.directions.should.be.an.Object();
        gameLogic.directions.should.be.eql(helper.directionsMap);
    });

    it('Should trigger move by each direction', () => {
        _.each(gameLogic.directions, (value, key) => {
            sandbox.stub(gameLogic, value);
            gameLogic.move(key);
            gameLogic[value].should.be.called();
        });
    });

    it('Should move tile up without breaking the board', () => {
        const initialCursor = gameLogic.findCursor();
        gameLogic.moveUp();
        const movedCursor = gameLogic.findCursor();
        (initialCursor - movedCursor).should.be.eql(helper.sideSize);

        _.times(helper.sideSize, () => {
            gameLogic.moveUp();
        });
        gameLogic.findCursor().should.be.eql(helper.sideSize - 1);
    });

    it('Should move tile left without breaking the board', () => {
        const initialCursor = gameLogic.findCursor();
        gameLogic.moveLeft();
        const movedCursor = gameLogic.findCursor();
        (initialCursor - movedCursor).should.be.eql(helper.moveLength);

        _.times(helper.sideSize, () => {
            gameLogic.moveLeft();
        });
        gameLogic.findCursor().should.be.eql(helper.numberOfTiles - helper.sideSize);
    });

    it('Should move tile down without breaking the board', () => {
        const initialCursor = gameLogic.findCursor();
        gameLogic.moveUp();
        const movedUpCursor = gameLogic.findCursor();
        movedUpCursor.should.not.be.eql(initialCursor);
        gameLogic.moveDown();
        const movedDownCursor = gameLogic.findCursor();
        movedDownCursor.should.be.eql(initialCursor);

        (movedDownCursor - movedUpCursor).should.be.eql(helper.sideSize);

        _.times(helper.sideSize, () => {
            gameLogic.moveDown();
        });

        gameLogic.findCursor().should.be.eql(helper.numberOfTiles - 1);
    });

    it('Should move tile right without breaking the board', () => {
        const initialCursor = gameLogic.findCursor();
        gameLogic.moveLeft();
        const movedLeftCursor = gameLogic.findCursor();
        movedLeftCursor.should.not.be.eql(initialCursor);
        gameLogic.moveRight();
        const movedRightCursor = gameLogic.findCursor();
        movedRightCursor.should.be.eql(initialCursor);

        (movedRightCursor - movedLeftCursor).should.be.eql(helper.moveLength);

        _.times(helper.sideSize, () => {
            gameLogic.moveDown();
        });

        gameLogic.findCursor().should.be.eql(helper.numberOfTiles - 1);
    });

});