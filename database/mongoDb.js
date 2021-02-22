const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

const logger = require('../logger/winston.logger')(path.basename(__filename));

const dbUri = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    logger.info('Successfully connected to MongoDB!');
  } catch (err) {
    logger.error(err);
  }
};

module.exports = connectDb;
