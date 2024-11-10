const { Router } = require('express');
const itemController = require('../controllers/itemController');

const router = Router();

router.get('/', itemController.getItems);
router.post('/', itemController.createItem);

router.get('/:itemId', itemController.getItemById);
router.patch('/:itemId', itemController.updateItemById);
router.delete('/:itemId', itemController.deleteItem);

module.exports = router;
