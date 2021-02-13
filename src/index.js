const express = require('express');
const connectDb = require('../database/mongoDb');

const app = express();
connectDb();

app.get('/', (req, res) => res.send('API Running...'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
