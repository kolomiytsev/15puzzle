'use strict';

const should = require('should-sinon');
const sandbox = require('sinon').createSandbox();
const helper = require('./helper');
const Scene = require('../lib/Scene');
let scene;

describe('Presentation', () => {
    beforeEach('Initial set up', () => {
        scene = new Scene();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should show initial message', () => {
        sandbox.stub(console, 'log');

        scene.initialMessage();
        console.log.should.be.calledTwice();
        console.log.should.be.calledWith(helper.firstInitialMessage);
        console.log.should.be.calledWith(helper.secondInitialMessage);

        sandbox.restore();
    });


    it('Should render board data', () => {
        sandbox.stub(console, 'log');

        scene.render(helper.board, helper.sideSize);
        console.log.should.have.callCount(helper.sideSize + 1);
        console.log.should.be.calledWithMatch(helper.renderMatchMessage);
        console.log.should.be.calledWith(helper.lastRenderMessage);

        sandbox.restore();
    });
});