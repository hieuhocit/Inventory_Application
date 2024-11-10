const { body } = require('express-validator');

const validate = [
  body('name').trim().notEmpty().withMessage('Please fill in the name field'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Please fill in the description field'),
];

module.exports = validate;
