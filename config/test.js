module.exports = {
  port: 9000,
  log: {
    level: 'silly',
    disabled: true,
  },
  cors: {
    origins: ['http://localhost:5173'],
    maxAge: 3 * 60 * 60,
  },
  cache: {
    name: 'test_cache',
    period: 1000,
    dir: './',
  },
};

