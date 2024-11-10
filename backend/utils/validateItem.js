const { body } = require('express-validator');

const validate = [
  body('categoryId')
    .trim()
    .notEmpty()
    .withMessage('Please select your category'),
  body('name').trim().notEmpty().withMessage('Please fill in the name field'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Please fill in the description field'),
  body('price').trim().notEmpty().withMessage('Please fill in the price field'),
  body('quantity')
    .trim()
    .notEmpty()
    .withMessage('Please fill in the quantity field'),
];

module.exports = validate;
