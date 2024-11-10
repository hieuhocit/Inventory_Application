const db = require('../db/categoryQueries');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const validateCategory = require('../utils/validateCategory');

async function getCategories(req, res) {
  try {
    const data = await db.getCategories();
    res.status(200).json({
      message: 'Get categories successfully.',
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

async function getCategoryById(req, res) {
  const { categoryId } = req.params;

  try {
    const data = await db.getCategoryById(categoryId);

    if (!data) {
      res.status(404).json({
        statusCode: 404,
        message: 'NOT FOUND',
        data: null,
      });
      return;
    }

    res.status(200).json({
      message: 'Get category successfully.',
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

const createCategory = [
  validateCategory,
  async (req, res) => {
    try {
      // Validate
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).send({
          statusCode: 400,
          message: 'Could not create category',
          errors: errors.errors,
        });
        return;
      }

      const data = req.body;
      data.id = uuidv4();
      const newData = await db.createCategory(data);

      // Create
      res.status(201).json({
        message: 'Create category successfully.',
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

const updateCategoryById = [
  validateCategory,
  async (req, res) => {
    try {
      // Validate
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).send({
          statusCode: 400,
          message: 'Could not update category',
          errors: errors.errors,
        });
        return;
      }

      // Validate
      const data = req.body;
      data.id = req.params.categoryId;

      const updatedData = await db.updateCategoryById(data);

      if (!updatedData) {
        res.status(404).json({
          statusCode: 404,
          message: 'NOT FOUND',
        });
      }

      // Update
      res.status(201).json({
        message: 'Update category successfully.',
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

async function deleteCategory(req, res) {
  const { categoryId } = req.params;
  try {
    const deletedData = await db.deleteCategory(categoryId);

    if (!deletedData) {
      res.status(404).json({
        statusCode: 404,
        message: 'NOT FOUND',
        data: null,
      });
      return;
    }

    res.status(200).json({
      message: 'Delete category successfully.',
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
  getCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategory,
};
