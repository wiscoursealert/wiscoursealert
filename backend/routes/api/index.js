const router = require('express').Router();

router.use('/users', require('./users'));

router.get('/', (req, res) => {
  res.send('hello');
});

module.exports = router;