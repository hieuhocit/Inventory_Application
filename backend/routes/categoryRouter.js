const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const { getItemsByCategoryId } = require('../controllers/itemController');

const router = Router();

router.get('/', categoryController.getCategories);
router.post('/', categoryController.createCategory);

router.get('/:categoryId', categoryController.getCategoryById);
router.get('/:categoryId/items', getItemsByCategoryId);

router.patch('/:categoryId', categoryController.updateCategoryById);
router.delete('/:categoryId', categoryController.deleteCategory);

module.exports = router;
