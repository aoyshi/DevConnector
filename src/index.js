const path = require('path');
const express = require('express');
const cors = require('cors');

const connectDb = require('../database/mongoDb');
const logger = require('../logger/winston.logger')(path.basename(__filename));
const userRoute = require('./api/user/user.route');
const authRoute = require('./api/auth/auth.route');
const profileRoute = require('./api/profile/profile.route');
const postRoute = require('./api/post/post.route');

const PORT = process.env.PORT || 7000;
const app = express();

// Connect to MongoDB
connectDb();

// Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.get('/', (req, res) => res.send('API Running...'));

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/profiles', profileRoute);

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}...`);
});
