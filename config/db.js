const currentEnv = process.env.NODE_ENV || 'local';
console.log(`Current ENV:${currentEnv}`);
const envs = {};
envs[currentEnv] = require(`./${currentEnv}.json`).db;
module.exports = envs;
