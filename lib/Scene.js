'use strict';

const _ = require('lodash');

class Scene {
    initialMessage() {
        console.log('To move tiles use arrows on keyboard');
        console.log('To exit game press Esc or Ctrl + c');
    }

    render(board, boardSideSize) {
        _.chunk(board, boardSideSize).forEach(boardRow => {
            console.log(boardRow.join(' | '))
        });
        console.log('----------------');
    }
}

module.exports = Scene;