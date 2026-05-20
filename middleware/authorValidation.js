const { body, validationResult } = require('express-validator')

const authorRules = [
    body('firstName').isLength({ min: 1 }).withMessage('First name must be at least 1 character'),
    body('lastName').isLength({ min: 1 }).withMessage('Last name must be at least 3 characters'),
    body('birthDate').isISO8601().withMessage('Please enter as YYYY-MM-DD'),
    body('publishedWorks').isNumeric().withMessage('Published work count must only contain numbers'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
module.exports = {authorRules}