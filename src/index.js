const express = require('express');
const connectDb = require('../database/mongoDb');

const PORT = process.env.PORT || 7000;
const app = express();

// Connect to MongoDB
connectDb();

// Parse JSON bodies
app.use(express.json());

// Define Routes
app.get('/', (req, res) => res.send('API Running...'));

app.use('/api/users', require('./api/user/route'));
app.use('/api/auth', require('./api/auth/route'));
app.use('/api/posts', require('./api/post/route'));
app.use('/api/profile', require('./api/profile/route'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
