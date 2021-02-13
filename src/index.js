const express = require('express');
const connectDb = require('../database/mongoDb');

const app = express();
connectDb();

app.get('/', (req, res) => {
  res.send('API Running...');
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
});