const pool = require('./pool');

async function getItems() {
  const { rows } = await pool.query(
    'SELECT * FROM items ORDER BY created_at DESC'
  );
  return rows;
}

async function getItemById(id) {
  const { rows } = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
  return rows[0];
}

async function getItemsByCategoryId(categoryId) {
  const { rows } = await pool.query(
    'SELECT * FROM items WHERE category_id = $1',
    [categoryId]
  );
  return rows;
}

async function createItem({
  id,
  categoryId,
  name,
  description,
  price,
  quantity,
  image,
}) {
  const { rows } = await pool.query(
    'INSERT INTO items (id,category_id,name,description,price,quantity,image,created_at,updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP) RETURNING *',
    [id, categoryId, name, description, price, quantity, image]
  );
  return rows[0];
}

async function updateItemById({
  id,
  categoryId,
  name,
  description,
  price,
  quantity,
  image,
}) {
  const { rows } = await pool.query(
    'UPDATE items SET category_id = $1, name = $2, description = $3, price = $4, quantity = $5, image = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
    [categoryId, name, description, price, quantity, image, id]
  );
  return rows[0];
}

async function deleteItem(id) {
  const { rows } = await pool.query(
    'DELETE FROM items WHERE id = $1 RETURNING *',
    [id]
  );
  return rows[0];
}

async function getItemsByName(name) {
  const { rows } = await pool.query(
    'SELECT * FROM items WHERE name ILIKE $1 ORDER BY created_at DESC',
    [`%${name}%`]
  );
  return rows;
}

module.exports = {
  getItems,
  getItemById,
  getItemsByCategoryId,
  createItem,
  updateItemById,
  deleteItem,
  getItemsByName,
};
