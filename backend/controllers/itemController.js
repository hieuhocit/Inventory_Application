const db = require('../db/itemQueries');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const validateItem = require('../utils/validateItem');

async function getItems(req, res) {
  const { search } = req.query;
  try {
    let data = [];
    if (search) {
      data = await db.getItemsByName(search);
    } else {
      data = await db.getItems();
    }

    res.status(200).json({
      message: 'Get items successfully.',
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: 'Something went wrong, please try again later.',
      data: null,
    });
  }
}

async function getItemById(req, res) {
  const { itemId } = req.params;

  try {
    const data = await db.getItemById(itemId);

    if (!data) {
      res.status(404).json({
        statusCode: 404,
        message: 'NOT FOUND',
        data: null,
      });
      return;
    }

    res.status(200).json({
      message: 'Get item successfully.',
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: 'Something went wrong, please try again later.',
    });
  }
}

// Use with categoryController, not itemController
async function getItemsByCategoryId(req, res) {
  const { categoryId } = req.params;

  try {
    const data = await db.getItemsByCategoryId(categoryId);

    if (!data) {
      res.status(404).json({
        statusCode: 404,
        message: 'NOT FOUND',
        data: null,
      });
      return;
    }

    res.status(200).json({
      message: 'Get item successfully.',
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: 'Something went wrong, please try again later.',
    });
  }
}

const createItem = [
  validateItem,
  async (req, res) => {
    try {
      // Validate
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).send({
          statusCode: 400,
          message: 'Could not create item',
          errors: errors.errors,
        });
        return;
      }

      const data = req.body;
      data.id = uuidv4();
      const newData = await db.createItem(data);

      // Create
      res.status(201).json({
        message: 'Create item successfully.',
        data: newData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        statusCode: 500,
        message: 'Something went wrong, please try again later.',
      });
    }
  },
];

const updateItemById = [
  validateItem,
  async (req, res) => {
    try {
      // Validate
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).send({
          statusCode: 400,
          message: 'Could not update item',
          errors: errors.errors,
        });
        return;
      }

      // Validate
      const data = req.body;
      data.id = req.params.itemId;

      const updatedData = await db.updateItemById(data);

      if (!updatedData) {
        res.status(404).json({
          statusCode: 404,
          message: 'NOT FOUND',
        });
      }

      // Update
      res.status(201).json({
        message: 'Update item successfully.',
        data: updatedData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        statusCode: 500,
        message: 'Something went wrong, please try again later.',
      });
    }
  },
];

async function deleteItem(req, res) {
  const { itemId } = req.params;
  try {
    const deletedData = await db.deleteItem(itemId);

    if (!deletedData) {
      res.status(404).json({
        statusCode: 404,
        message: 'NOT FOUND',
        data: null,
      });
      return;
    }

    res.status(200).json({
      message: 'Delete item successfully.',
      data: deletedData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: 'Something went wrong, please try again later.',
    });
  }
}

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItemById,
  deleteItem,
  getItemsByCategoryId,
};
