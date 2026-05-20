const express = require('express');
const router = new express.Router();

router.use('/', require('./swaggerRoutes'));

router.get('/', (req, res) => {
  res.send('Hello world');
});

router.use('/book', require('./bookRoutes'));
router.use('/author', require('./authorRoutes'));

module.exports = router;