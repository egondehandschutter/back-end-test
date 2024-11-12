const supertest = require('supertest');

const createServer = require('../src/createServer');
const { getCache } = require('../src/data');


const withServer = (setter) => {
  let server;

  beforeAll(async () => {
    server = await createServer();

    setter({
      cache: getCache(),
      supertest: supertest(server.getApp().callback()),
    });
  });

  afterAll(async () => {
    await server.stop();
  });
};

module.exports = {
  withServer,
};
