const express = require('express');
const passport = require('passport');
const router = new express.Router();

router.use('/', require('./swaggerRoutes'));

router.use('/book', require('./bookRoutes'));
router.use('/author', require('./authorRoutes'));

router.get('/login', passport.authenticate('github'), (req, res) => { });

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  })
})

module.exports = router;