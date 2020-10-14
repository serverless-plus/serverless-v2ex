process.env.NODE_ENV = 'production';
process.env.SERVERLESS = true;

const createServer = require('./dist');

module.exports = createServer;
