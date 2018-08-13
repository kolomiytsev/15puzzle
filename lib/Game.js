'use strict';

const readline = require('readline');

class Game {
    constructor(gameLogic, scene) {
        this._gameLogic = gameLogic;
        this._scene = scene;
    }

    start() {
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);
        process.stdin.on('keypress', (str, key) => {
            this.handleKeyPress(str, key);
        });
    }

    handleKeyPress(str, key) {
        if (!(key && key.name)) return;

        if (key && (key.name === 'escape' || (key.ctrl && key.name === 'c'))) {
            return this.exit();
        }

        try {
            this._gameLogic.move(key.name);
            if (this._gameLogic.playerWon) {
                return this.won();
            }
            this._scene.render(this._gameLogic.board, this._gameLogic.boardSideSize);
        }
        catch (error) {
        }
    }

    won() {
        console.log('Victory!');
        process.exit(0);
    }

    exit() {
        console.log('Game Over!');
        process.exit(0);
    }
}

module.exports = Game;