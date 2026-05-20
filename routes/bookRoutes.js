const express = require('express');
const router = new express.Router();
const { bookRules } = require('../middleware/bookValidation')

const bookController = require('../controllers/bookController');

router.get('/', bookController.getAllBooks);

router.get('/:id', bookController.getSingleBook);

router.post('/', bookRules, bookController.createBook);

router.put('/:id', bookRules, bookController.updateBook);

router.delete('/:id', bookController.deleteBook);

module.exports = router;