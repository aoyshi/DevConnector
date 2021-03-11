const path = require('path');
const express = require('express');
const cors = require('cors');

const connectDb = require('../database/mongoDb');
const logger = require('../logger/winston.logger')(path.basename(__filename));
const userRoute = require('./api/user/user.route');
const authRoute = require('./api/auth/auth.route');
const profileRoute = require('./api/profile/profile.route');
const postRoute = require('./api/post/post.route');

const app = express();

// Connect to MongoDB
connectDb();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/profiles', profileRoute);

// Serve static assets in prod
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}...`);
});
