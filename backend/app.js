require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const categoryRouter = require('./routes/categoryRouter');
const itemRouter = require('./routes/itemRouter');

const app = express();

// cors
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
  })
);

// Static assets
app.use(express.static(path.join(__dirname, 'public')));

//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routing
app.use('/categories', categoryRouter);
app.use('/items', itemRouter);

// 404
app.use((req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: 'Page not found.',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server listening on port 3000');
});
