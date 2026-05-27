const express = require('express');
const router = new express.Router();
const { bookRules } = require('../middleware/bookValidation')
const { isAuthenticated } = require('../middleware/authenticate')

const bookController = require('../controllers/bookController');

router.get('/', bookController.getAllBooks);

router.get('/:id', bookController.getSingleBook);

router.post('/', isAuthenticated, bookRules, bookController.createBook);

router.put('/:id', isAuthenticated, bookRules, bookController.updateBook);

router.delete('/:id', isAuthenticated, bookController.deleteBook);

module.exports = router;