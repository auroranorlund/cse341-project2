const express = require('express');
const router = new express.Router();
const { authorRules } = require('../middleware/authorValidation')
const { isAuthenticated } = require('../middleware/authenticate')

const authorController = require('../controllers/authorController');

router.get('/', authorController.getAllAuthors);

router.get('/:id', authorController.getSingleAuthor);

router.post('/', isAuthenticated, authorRules, authorController.createAuthor);

router.put('/:id', isAuthenticated, authorRules, authorController.updateAuthor);

router.delete('/:id', isAuthenticated, authorController.deleteAuthor);

module.exports = router;