const express = require('express');
const router = new express.Router();
const { authorRules } = require('../middleware/authorValidation')

const authorController = require('../controllers/authorController');

router.get('/', authorController.getAllAuthors);

router.get('/:id', authorController.getSingleAuthor);

router.post('/', authorRules, authorController.createAuthor);

router.put('/:id', authorRules, authorController.updateAuthor);

router.delete('/:id', authorController.deleteAuthor);

module.exports = router;