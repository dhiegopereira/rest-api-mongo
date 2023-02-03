const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const mongoose = require('mongoose');
const Message = require('../models/message');
const message = require('../controllers/messages');

chai.use(sinonChai);
const expect = chai.expect;

describe('Message Controller', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('getAll', () => {
        it('should return a list of messages', async () => {
            // arrange
            const messages = [{ _id: '123', content: 'Hello, world!' }];
            sandbox.stub(Message, 'find').resolves(messages);

            const req = {};
            const res = {
                json: sinon.spy()
            };

            // act
            await message.getAll(req, res);

            // assert
            expect(res.json).to.have.been.calledWith(messages);
        });

        it('should return 500 if an error occurs', async () => {
            // arrange
            const error = new Error('Some error');
            sandbox.stub(Message, 'find').rejects(error);

            const req = {};
            const res = {
                status: sinon.stub().returns({
                    json: sinon.spy()
                })
            };

            // act
            await message.getAll(req, res);

            // assert
            expect(res.status).to.have.been.calledWith(500);
            expect(res.status().json).to.have.been.calledWith({ message: error.message });
        });
    });
});

   