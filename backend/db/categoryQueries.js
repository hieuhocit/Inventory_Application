const pool = require('./pool');

async function getCategories() {
  const { rows } = await pool.query(
    'SELECT * FROM categories ORDER BY created_at DESC'
  );
  return rows;
}

async function getCategoryById(id) {
  const { rows } = await pool.query('SELECT * FROM categories WHERE id = $1', [
    id,
  ]);
  return rows[0];
}

async function createCategory({ id, name, description, image }) {
  const { rows } = await pool.query(
    'INSERT INTO categories (id,name,description,image,created_at,updated_at) VALUES ($1,$2,$3,$4,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP) RETURNING *',
    [id, name, description, image]
  );
  return rows[0];
}

async function updateCategoryById({ id, name, description, image }) {
  const { rows } = await pool.query(
    'UPDATE categories SET name = $1, description = $2, image = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
    [name, description, image, id]
  );
  return rows[0];
}

async function deleteCategory(id) {
  const { rows } = await pool.query(
    'DELETE FROM categories WHERE id = $1 RETURNING *',
    [id]
  );
  return rows[0];
}

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategory,
};
