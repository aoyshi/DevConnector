const express = require('express');
const connectDb = require('../database/mongoDb');

const userRoute = require('./api/user/route');
const authRoute = require('./api/auth/route');
const profileRoute = require('./api/profile/route');
const postsRoute = require('./api/post/route');

const PORT = process.env.PORT || 7000;
const app = express();

// Connect to MongoDB
connectDb();

// Parse JSON bodies
app.use(express.json());

// Define Routes
app.get('/', (req, res) => res.send('API Running...'));

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postsRoute);
app.use('/api/profile', profileRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
