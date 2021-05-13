const { setIntervalAsync } = require('set-interval-async/fixed');

const timer = setIntervalAsync(() => {
  console.log('Hello');
}, 1000);

module.exports = timer;