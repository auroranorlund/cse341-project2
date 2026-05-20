const { body, validationResult } = require('express-validator')

const bookRules = [
    body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
    body('author').isLength({ min: 3 }).withMessage('Author must be at least 3 characters'),
    body('publishDate').isISO8601().withMessage('Please enter as YYYY-MM-DD'),
    body('genre').isLength({ min: 3 }).withMessage('Genre must be at least 3 characters'),
    body('wordCount').isNumeric().withMessage('Word count must only contain numbers'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
module.exports = {bookRules}